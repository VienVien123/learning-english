"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  Loader2,
  UploadCloud,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Deck, Vocabulary } from "@/lib/types";

const REQUIRED_COLUMNS = ["word", "meaning"] as const;
const SUPPORTED_COLUMNS = [
  "word",
  "meaning",
  "pronunciation",
  "part_of_speech",
  "example",
  "example_translation",
  "note",
  "synonyms",
  "antonyms",
  "tags",
  "favorite",
] as const;

const MAX_IMPORT_ROWS = 3000;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

type DuplicateMode = "skip" | "update";

type ParsedRow = {
  rowNumber: number;
  word: string;
  meaning: string;
  pronunciation: string;
  part_of_speech: string;
  example: string;
  example_translation: string;
  note: string;
  synonyms: string[];
  antonyms: string[];
  tags: string[];
  favorite: boolean;
  errors: string[];
};

type ImportSummary = {
  inserted: number;
  updated: number;
  skipped: number;
};

function normalizeHeader(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

function text(value: unknown) {
  return String(value ?? "").trim();
}

function list(value: unknown) {
  const raw = text(value);
  if (!raw) return [];
  const separator = raw.includes("|") ? "|" : raw.includes(";") ? ";" : ",";
  return raw.split(separator).map((item) => item.trim()).filter(Boolean);
}

function bool(value: unknown) {
  const raw = text(value).toLowerCase();
  return ["true", "1", "yes", "y", "x", "có", "co"].includes(raw);
}

function wordKey(word: string) {
  return word.trim().toLocaleLowerCase("en-US");
}

function chunks<T>(items: T[], size: number) {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) result.push(items.slice(i, i + size));
  return result;
}

export default function ImportWordsModal({
  open,
  userId,
  decks,
  words,
  onClose,
  onImported,
}: {
  open: boolean;
  userId: string;
  decks: Deck[];
  words: Vocabulary[];
  onClose: () => void;
  onImported: (summary: ImportSummary) => void | Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [deckId, setDeckId] = useState("");
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [parseError, setParseError] = useState("");
  const [duplicateMode, setDuplicateMode] = useState<DuplicateMode>("skip");
  const [dragging, setDragging] = useState(false);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState<ImportSummary | null>(null);

  useEffect(() => {
    if (!open) return;
    setDeckId(decks[0]?.id ?? "");
    setFileName("");
    setRows([]);
    setParseError("");
    setDuplicateMode("skip");
    setImporting(false);
    setProgress(0);
    setSummary(null);
  }, [open, decks]);

  const existingInDeck = useMemo(() => {
    const map = new Map<string, Vocabulary>();
    for (const word of words) {
      if ((word.deck_id ?? "") === deckId) map.set(wordKey(word.word), word);
    }
    return map;
  }, [words, deckId]);

  const validRows = useMemo(() => rows.filter((row) => row.errors.length === 0), [rows]);
  const invalidRows = rows.length - validRows.length;
  const existingDuplicates = useMemo(
    () => validRows.filter((row) => existingInDeck.has(wordKey(row.word))).length,
    [validRows, existingInDeck]
  );

  if (!open) return null;

  async function parseFile(file: File) {
    setParseError("");
    setRows([]);
    setSummary(null);
    setProgress(0);

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !["csv", "xlsx", "xls"].includes(extension)) {
      setParseError("Chỉ hỗ trợ file .csv, .xlsx hoặc .xls.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setParseError("File lớn hơn 10 MB. Hãy chia file thành nhiều phần nhỏ hơn.");
      return;
    }

    try {
      const XLSX = await import("xlsx");
      const workbook = extension === "csv"
        ? XLSX.read(await file.text(), { type: "string", raw: false })
        : XLSX.read(await file.arrayBuffer(), { type: "array", raw: false });

      const sheetName = workbook.SheetNames.find((name) => name.toLowerCase() === "vocabulary") ?? workbook.SheetNames[0];
      if (!sheetName) throw new Error("Không tìm thấy sheet dữ liệu.");
      const sheet = workbook.Sheets[sheetName];

      const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
        header: 1,
        defval: "",
        raw: false,
        blankrows: false,
      });

      if (matrix.length === 0) throw new Error("File không có dữ liệu.");
      const headers = (matrix[0] ?? []).map(normalizeHeader);
      const missing = REQUIRED_COLUMNS.filter((column) => !headers.includes(column));
      if (missing.length) {
        throw new Error(`Thiếu cột bắt buộc: ${missing.join(", ")}. Hãy dùng file template của TV-English.`);
      }

      const columnIndexes = new Map<string, number>();
      headers.forEach((header, index) => {
        if (SUPPORTED_COLUMNS.includes(header as (typeof SUPPORTED_COLUMNS)[number])) columnIndexes.set(header, index);
      });

      const get = (row: unknown[], key: string) => {
        const index = columnIndexes.get(key);
        return index === undefined ? "" : row[index];
      };

      const parsed: ParsedRow[] = [];
      const seen = new Set<string>();

      for (let i = 1; i < matrix.length; i++) {
        const raw = matrix[i] ?? [];
        const rowWord = text(get(raw, "word"));
        const rowMeaning = text(get(raw, "meaning"));
        const hasAnyValue = raw.some((cell) => text(cell));
        if (!hasAnyValue) continue;

        const errors: string[] = [];
        if (!rowWord) errors.push("Thiếu word");
        if (!rowMeaning) errors.push("Thiếu meaning");
        const key = wordKey(rowWord);
        if (rowWord && seen.has(key)) errors.push("Từ bị lặp trong file");
        if (rowWord) seen.add(key);

        parsed.push({
          rowNumber: i + 1,
          word: rowWord,
          meaning: rowMeaning,
          pronunciation: text(get(raw, "pronunciation")),
          part_of_speech: text(get(raw, "part_of_speech")),
          example: text(get(raw, "example")),
          example_translation: text(get(raw, "example_translation")),
          note: text(get(raw, "note")),
          synonyms: list(get(raw, "synonyms")),
          antonyms: list(get(raw, "antonyms")),
          tags: list(get(raw, "tags")),
          favorite: bool(get(raw, "favorite")),
          errors,
        });
      }

      if (parsed.length === 0) throw new Error("Không tìm thấy dòng từ vựng nào để import.");
      if (parsed.length > MAX_IMPORT_ROWS) {
        throw new Error(`Mỗi lần import tối đa ${MAX_IMPORT_ROWS.toLocaleString("vi-VN")} từ. File hiện có ${parsed.length.toLocaleString("vi-VN")} dòng.`);
      }

      setFileName(file.name);
      setRows(parsed);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể đọc file.";
      setParseError(message);
      setFileName(file.name);
    }
  }

  async function runImport() {
    if (!validRows.length || importing) return;
    setImporting(true);
    setParseError("");
    setSummary(null);
    setProgress(5);

    try {
      const insertRows: Record<string, unknown>[] = [];
      const updateRows: Record<string, unknown>[] = [];
      let skipped = invalidRows;

      for (const row of validRows) {
        const existing = existingInDeck.get(wordKey(row.word));
        const payload = {
          user_id: userId,
          deck_id: deckId || null,
          word: row.word,
          meaning: row.meaning,
          pronunciation: row.pronunciation || null,
          part_of_speech: row.part_of_speech || null,
          example: row.example || null,
          example_translation: row.example_translation || null,
          note: row.note || null,
          synonyms: row.synonyms,
          antonyms: row.antonyms,
          tags: row.tags,
          favorite: row.favorite,
          updated_at: new Date().toISOString(),
        };

        if (existing) {
          if (duplicateMode === "skip") {
            skipped += 1;
          } else {
            updateRows.push({ id: existing.id, ...payload });
          }
        } else {
          insertRows.push(payload);
        }
      }

      const totalOperations = insertRows.length + updateRows.length;
      let completed = 0;

      for (const batch of chunks(insertRows, 200)) {
        const { error } = await supabase.from("vocabularies").insert(batch);
        if (error) throw new Error(error.message);
        completed += batch.length;
        setProgress(totalOperations ? Math.round((completed / totalOperations) * 90) + 5 : 95);
      }

      for (const batch of chunks(updateRows, 100)) {
        const { error } = await supabase.from("vocabularies").upsert(batch, { onConflict: "id" });
        if (error) throw new Error(error.message);
        completed += batch.length;
        setProgress(totalOperations ? Math.round((completed / totalOperations) * 90) + 5 : 95);
      }

      const nextSummary = { inserted: insertRows.length, updated: updateRows.length, skipped };
      setProgress(100);
      setSummary(nextSummary);
      await onImported(nextSummary);
    } catch (error) {
      setParseError(error instanceof Error ? error.message : "Import thất bại. Hãy thử lại.");
    } finally {
      setImporting(false);
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void parseFile(file);
  }

  return (
    <div className="modal-backdrop" onMouseDown={() => !importing && onClose()}>
      <div className="modal-card import-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="eyebrow"><UploadCloud size={14} /> Bulk vocabulary import</div>
            <h2>Import từ CSV / Excel</h2>
            <p>Tải template, điền đúng cột rồi xem trước dữ liệu trước khi đưa vào thư viện.</p>
          </div>
          <button className="icon-btn" onClick={onClose} disabled={importing} aria-label="Close"><X size={20} /></button>
        </div>

        <div className="import-template-box">
          <div>
            <strong>1. Tải file template mẫu</strong>
            <span>Không đổi tên cột. Chỉ <b>word</b> và <b>meaning</b> là bắt buộc.</span>
          </div>
          <div className="template-buttons">
            <a className="button secondary" href="/templates/vocabulary-import-template.xlsx" download><FileSpreadsheet size={16} /> Excel template</a>
            <a className="button secondary" href="/templates/vocabulary-import-template.csv" download><FileText size={16} /> CSV template</a>
          </div>
        </div>

        <div className="import-settings">
          <label>
            <span>2. Chọn deck sẽ import vào</span>
            <select value={deckId} onChange={(e) => setDeckId(e.target.value)} disabled={importing}>
              <option value="">No deck</option>
              {decks.map((deck) => <option key={deck.id} value={deck.id}>{deck.icon} {deck.name}</option>)}
            </select>
          </label>
          <label>
            <span>Nếu từ đã tồn tại trong deck</span>
            <select value={duplicateMode} onChange={(e) => setDuplicateMode(e.target.value as DuplicateMode)} disabled={importing}>
              <option value="skip">Bỏ qua từ trùng</option>
              <option value="update">Cập nhật từ trùng</option>
            </select>
          </label>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void parseFile(file);
            event.target.value = "";
          }}
        />

        <div
          className={`import-dropzone ${dragging ? "dragging" : ""}`}
          onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !importing && inputRef.current?.click()}
          role="button"
          tabIndex={0}
        >
          <span className="import-drop-icon"><UploadCloud size={27} /></span>
          <strong>{fileName || "3. Kéo file vào đây hoặc bấm để chọn file"}</strong>
          <span>Hỗ trợ .csv, .xlsx, .xls · tối đa 10 MB · tối đa {MAX_IMPORT_ROWS.toLocaleString("vi-VN")} từ/lần</span>
        </div>

        {parseError && <div className="import-alert error"><AlertCircle size={17} /><span>{parseError}</span></div>}

        {rows.length > 0 && (
          <>
            <div className="import-summary-grid">
              <div><strong>{rows.length}</strong><span>Dòng đọc được</span></div>
              <div className="success"><strong>{validRows.length}</strong><span>Hợp lệ</span></div>
              <div className={invalidRows ? "danger" : ""}><strong>{invalidRows}</strong><span>Có lỗi</span></div>
              <div className={existingDuplicates ? "warning" : ""}><strong>{existingDuplicates}</strong><span>Trùng thư viện</span></div>
            </div>

            <div className="import-preview">
              <div className="import-preview-head">
                <div><strong>Xem trước</strong><span>Hiển thị tối đa 8 dòng đầu tiên.</span></div>
                <span className="import-columns-note">Synonyms / antonyms / tags: dùng dấu <b>|</b> để ngăn cách</span>
              </div>
              <div className="import-table-wrap">
                <table className="import-table">
                  <thead><tr><th>#</th><th>Word</th><th>Meaning</th><th>Part of speech</th><th>Tags</th><th>Status</th></tr></thead>
                  <tbody>
                    {rows.slice(0, 8).map((row) => {
                      const duplicate = existingInDeck.has(wordKey(row.word));
                      return <tr key={`${row.rowNumber}-${row.word}`} className={row.errors.length ? "invalid" : ""}>
                        <td>{row.rowNumber}</td>
                        <td><strong>{row.word || "—"}</strong></td>
                        <td>{row.meaning || "—"}</td>
                        <td>{row.part_of_speech || "—"}</td>
                        <td>{row.tags.join(", ") || "—"}</td>
                        <td>{row.errors.length
                          ? <span className="import-status error"><AlertCircle size={13} /> {row.errors.join(", ")}</span>
                          : duplicate
                            ? <span className="import-status warning">Đã tồn tại</span>
                            : <span className="import-status success"><CheckCircle2 size={13} /> Sẵn sàng</span>}</td>
                      </tr>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {importing && (
          <div className="import-progress">
            <div><span>Đang import dữ liệu…</span><strong>{progress}%</strong></div>
            <div className="import-progress-track"><span style={{ width: `${progress}%` }} /></div>
          </div>
        )}

        {summary && (
          <div className="import-alert success">
            <CheckCircle2 size={18} />
            <span>Hoàn tất: <b>{summary.inserted}</b> từ mới, <b>{summary.updated}</b> từ cập nhật, <b>{summary.skipped}</b> dòng bỏ qua.</span>
          </div>
        )}

        <div className="modal-actions import-actions">
          <button className="button secondary" onClick={onClose} disabled={importing}>Đóng</button>
          <button className="button primary" onClick={runImport} disabled={importing || validRows.length === 0}>
            {importing ? <><Loader2 className="spin" size={16} /> Đang import…</> : <><UploadCloud size={16} /> Import {validRows.length || ""} từ</>}
          </button>
        </div>
      </div>
    </div>
  );
}
