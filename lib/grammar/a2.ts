import type { GrammarTopic } from "./types";

export const A2_TOPICS: GrammarTopic[] = [
  // ───────────────────────────── 1. PAST SIMPLE ─────────────────────────────
  {
    id: "a2-past-simple",
    level: "A2",
    title: "Thì quá khứ đơn",
    titleEn: "Past simple",
    summary:
      "Thì quá khứ đơn dùng để kể những việc đã xảy ra và đã kết thúc trong quá khứ. Bài này hướng dẫn cách dùng was/were, cách thêm -ed (viết và phát âm), các động từ bất quy tắc thông dụng và cách đặt câu phủ định, câu hỏi với did.",
    sections: [
      {
        heading: "Khi nào dùng thì quá khứ đơn?",
        text: "Dùng thì quá khứ đơn khi một hành động hoặc tình trạng đã xảy ra và đã kết thúc trong quá khứ, thường có (hoặc ngầm hiểu) một thời điểm xác định.",
        points: [
          "Một hành động đã kết thúc tại thời điểm xác định: I visited my grandma last Sunday.",
          "Một chuỗi hành động nối tiếp nhau trong quá khứ (hay dùng khi kể chuyện): I got up, had breakfast and went to work.",
          "Một thói quen hoặc tình trạng kéo dài trong quá khứ nhưng nay không còn nữa: She lived in Hue for ten years.",
        ],
        examples: [
          { en: "I visited my grandma last Sunday.", vi: "Tôi đã đi thăm bà vào Chủ nhật tuần trước." },
          { en: "I got up, had breakfast and went to work.", vi: "Tôi thức dậy, ăn sáng rồi đi làm." },
          {
            en: "She lived in Hue for ten years.",
            vi: "Cô ấy đã sống ở Huế mười năm.",
            note: "Hiện tại cô ấy không còn sống ở Huế nữa.",
          },
        ],
      },
      {
        heading: "Động từ to be: was / were",
        text: "Ở quá khứ, “to be” có hai dạng: was (dùng với I, he, she, it và danh từ số ít) và were (dùng với you, we, they và danh từ số nhiều). Câu phủ định và câu hỏi với was/were KHÔNG dùng did.",
        formulas: [
          { label: "Khẳng định", pattern: "S + was/were + ..." },
          { label: "Phủ định", pattern: "S + was/were + not + ... (wasn't / weren't)" },
          { label: "Câu hỏi", pattern: "Was/Were + S + ...?" },
          { label: "Trả lời ngắn", pattern: "Yes, S + was/were. / No, S + wasn't/weren't." },
          { label: "Câu hỏi có từ để hỏi", pattern: "Wh- + was/were + S + ...?" },
        ],
        examples: [
          { en: "I was tired yesterday.", vi: "Hôm qua tôi mệt." },
          { en: "They weren't at home last night.", vi: "Tối qua họ không có ở nhà." },
          { en: "Were you busy this morning? – Yes, I was.", vi: "Sáng nay bạn có bận không? – Có, mình bận." },
          { en: "Where were you at 8 o'clock?", vi: "Lúc 8 giờ bạn ở đâu?" },
        ],
      },
      {
        heading: "Động từ thường: V2, didn't + V, Did ... + V?",
        text: "Với động từ thường, câu khẳng định dùng dạng quá khứ V2 cho mọi chủ ngữ. Câu phủ định và câu hỏi dùng trợ động từ did, và động từ chính trở về dạng nguyên mẫu (V).",
        formulas: [
          { label: "Khẳng định", pattern: "S + V2 + (O)" },
          { label: "Phủ định", pattern: "S + did not (didn't) + V + (O)" },
          { label: "Câu hỏi Yes/No", pattern: "Did + S + V + (O)?" },
          { label: "Trả lời ngắn", pattern: "Yes, S + did. / No, S + didn't." },
          { label: "Câu hỏi có từ để hỏi", pattern: "Wh- + did + S + V + (O)?" },
        ],
        points: [
          "V2 giống nhau với mọi chủ ngữ: I worked, she worked, they worked (không thêm -s).",
          "Sau did / didn't luôn là động từ nguyên mẫu: She didn't go (KHÔNG nói: didn't went).",
          "Khi từ để hỏi chính là chủ ngữ (Who, What), thường không dùng did: Who called you? (Ai đã gọi cho bạn?)",
        ],
        examples: [
          { en: "We watched a film last night.", vi: "Tối qua chúng tôi đã xem một bộ phim." },
          { en: "He didn't come to class yesterday.", vi: "Hôm qua anh ấy không đến lớp." },
          {
            en: "Did you call your mum last night? – No, I didn't.",
            vi: "Tối qua bạn có gọi cho mẹ không? – Không, mình không gọi.",
          },
          { en: "What did you eat for lunch?", vi: "Bữa trưa bạn đã ăn gì?" },
        ],
      },
      {
        heading: "Động từ có quy tắc: thêm -ed (cách viết và cách phát âm)",
        text: "Phần lớn động từ tạo dạng quá khứ bằng cách thêm -ed. Cần chú ý một số quy tắc chính tả và ba cách phát âm đuôi -ed.",
        table: {
          head: ["Quy tắc viết", "Ví dụ"],
          rows: [
            ["Thông thường: thêm -ed", "work → worked, play → played, watch → watched"],
            ["Tận cùng là -e: chỉ thêm -d", "live → lived, like → liked, dance → danced"],
            ["Phụ âm + y: đổi y thành i rồi thêm -ed", "study → studied, try → tried, cry → cried"],
            ["Nguyên âm + y: giữ nguyên y, thêm -ed", "play → played, stay → stayed, enjoy → enjoyed"],
            [
              "Từ 1 âm tiết, tận cùng bằng 1 nguyên âm + 1 phụ âm: gấp đôi phụ âm cuối",
              "stop → stopped, plan → planned, shop → shopped",
            ],
            [
              "Từ 2 âm tiết có trọng âm ở âm tiết cuối: gấp đôi phụ âm cuối",
              "prefer → preferred, admit → admitted (nhưng visit → visited vì trọng âm ở âm tiết đầu)",
            ],
          ],
        },
        points: [
          "Không gấp đôi w, x, y: fix → fixed, snow → snowed, play → played.",
          "Anh-Anh gấp đôi l trong travel → travelled; Anh-Mỹ viết traveled. Cả hai đều đúng.",
          "Đọc là /ɪd/ khi động từ tận cùng bằng âm /t/ hoặc /d/: wanted, needed, visited.",
          "Đọc là /t/ khi động từ tận cùng bằng âm vô thanh /p/, /k/, /f/, /s/, /ʃ/, /tʃ/: stopped, worked, laughed, missed, washed, watched.",
          "Đọc là /d/ trong các trường hợp còn lại (âm hữu thanh và nguyên âm): played, lived, cleaned, opened.",
          "Lưu ý: cách đọc dựa vào ÂM cuối chứ không phải chữ cái cuối. Ví dụ laugh kết thúc bằng chữ h nhưng âm cuối là /f/, nên laughed đọc đuôi là /t/.",
        ],
      },
      {
        heading: "Động từ bất quy tắc thông dụng",
        text: "Nhiều động từ thông dụng không thêm -ed mà có dạng quá khứ riêng; cách duy nhất là học thuộc. Cột V3 (quá khứ phân từ) sẽ dùng trong thì hiện tại hoàn thành.",
        table: {
          head: ["V (nguyên mẫu)", "V2 (quá khứ)", "V3 (quá khứ phân từ)", "Nghĩa"],
          rows: [
            ["be", "was / were", "been", "thì, là, ở"],
            ["go", "went", "gone", "đi"],
            ["have", "had", "had", "có; ăn, uống"],
            ["do", "did", "done", "làm"],
            ["make", "made", "made", "làm, chế tạo"],
            ["get", "got", "got (Mỹ: gotten)", "nhận được, trở nên"],
            ["see", "saw", "seen", "nhìn thấy"],
            ["come", "came", "come", "đến"],
            ["take", "took", "taken", "cầm, lấy, mang đi"],
            ["give", "gave", "given", "cho, đưa"],
            ["eat", "ate", "eaten", "ăn"],
            ["drink", "drank", "drunk", "uống"],
            ["buy", "bought", "bought", "mua"],
            ["think", "thought", "thought", "nghĩ"],
            ["know", "knew", "known", "biết"],
            ["say", "said", "said", "nói"],
            ["tell", "told", "told", "kể, bảo"],
            ["write", "wrote", "written", "viết"],
            ["meet", "met", "met", "gặp"],
            ["leave", "left", "left", "rời đi"],
            ["find", "found", "found", "tìm thấy"],
            ["sleep", "slept", "slept", "ngủ"],
            ["speak", "spoke", "spoken", "nói (ngôn ngữ)"],
            ["read", "read", "read", "đọc"],
          ],
        },
        points: [
          "read – read – read viết giống nhau, nhưng V2 và V3 đọc là /red/, còn nguyên mẫu đọc là /riːd/.",
          "said đọc là /sed/, không đọc là /seɪd/.",
        ],
        examples: [
          { en: "I went to Da Lat last summer.", vi: "Mùa hè năm ngoái tôi đã đi Đà Lạt." },
          { en: "She bought a new bag yesterday.", vi: "Hôm qua cô ấy đã mua một cái túi mới." },
          { en: "We met at a coffee shop two years ago.", vi: "Chúng tôi gặp nhau ở một quán cà phê hai năm trước." },
        ],
      },
      {
        heading: "Dấu hiệu nhận biết",
        text: "Những từ và cụm từ chỉ một thời điểm đã qua thường đi với thì quá khứ đơn:",
        points: [
          "yesterday, yesterday morning, the day before yesterday",
          "last night / last week / last month / last year / last Monday",
          "... ago: two days ago, ten minutes ago, a long time ago",
          "in + năm hoặc mốc đã qua: in 2019, in the past",
          "when + mệnh đề quá khứ: when I was a child, when I was at school",
          "Câu hỏi When...? hoặc What time...? về việc đã xảy ra: When did you arrive?",
        ],
        examples: [
          { en: "I saw him two days ago.", vi: "Tôi đã gặp anh ấy hai ngày trước." },
          { en: "When I was a child, I didn't like vegetables.", vi: "Hồi nhỏ tôi không thích ăn rau." },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "I didn't went to school yesterday.",
        right: "I didn't go to school yesterday.",
        why: "Sau didn't phải dùng động từ nguyên mẫu, vì did đã thể hiện thì quá khứ rồi.",
      },
      {
        wrong: "Did you saw my phone?",
        right: "Did you see my phone?",
        why: "Trong câu hỏi với Did, động từ chính ở dạng nguyên mẫu.",
      },
      {
        wrong: "I was go to the market this morning.",
        right: "I went to the market this morning.",
        why: "Không ghép was với động từ nguyên mẫu. Người Việt hay dịch chữ “đã” thành was, nhưng động từ thường ở quá khứ chỉ cần dạng V2.",
      },
      {
        wrong: "She buyed a new dress.",
        right: "She bought a new dress.",
        why: "buy là động từ bất quy tắc: buy – bought – bought.",
      },
      {
        wrong: "Did you be at home last night?",
        right: "Were you at home last night?",
        why: "Với động từ to be, câu hỏi chỉ cần đưa was/were lên trước chủ ngữ, không dùng did.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "We ___ at home last night.",
        options: ["was", "were", "are", "did"],
        answer: 1,
        explain:
          "Chủ ngữ We đi với were. “last night” là quá khứ nên không dùng are; was chỉ đi với I/he/she/it.",
      },
      {
        kind: "choice",
        question: "She ___ to the cinema with her friends yesterday.",
        options: ["go", "goes", "went", "gone"],
        answer: 2,
        explain:
          "“yesterday” → thì quá khứ đơn. go là động từ bất quy tắc: go – went – gone. gone là V3, không đứng một mình làm động từ chính.",
      },
      {
        kind: "choice",
        question: "___ you finish your homework last night?",
        options: ["Do", "Were", "Was", "Did"],
        answer: 3,
        explain:
          "Câu hỏi với động từ thường ở quá khứ: Did + S + V? Không dùng Were/Was vì finish là động từ thường, không phải to be.",
      },
      {
        kind: "choice",
        question: "The baby ___ all night yesterday.",
        options: ["cryed", "cried", "cries", "crys"],
        answer: 1,
        explain:
          "cry tận cùng bằng phụ âm + y → đổi y thành i rồi thêm -ed: cried. “cries” là hiện tại đơn, không hợp với “yesterday”.",
      },
      {
        kind: "choice",
        question: "I ___ him two days ago.",
        options: ["saw", "have seen", "see", "was see"],
        answer: 0,
        explain:
          "“two days ago” chỉ một thời điểm xác định trong quá khứ → quá khứ đơn (saw). Không dùng hiện tại hoàn thành (have seen) với ago.",
      },
      {
        kind: "fill",
        question: "They ___ TV last night because they were tired.",
        answers: ["didn't watch", "did not watch"],
        hint: "not watch",
        explain: "Phủ định của động từ thường ở quá khứ: didn't + V nguyên mẫu → didn't watch.",
      },
      {
        kind: "fill",
        question: "I ___ a new phone last week.",
        answers: ["bought"],
        hint: "buy",
        explain: "“last week” → quá khứ đơn. buy là động từ bất quy tắc: buy – bought – bought.",
      },
      {
        kind: "fill",
        question: "Where ___ you go on holiday last summer?",
        answers: ["did"],
        hint: "do",
        explain: "Câu hỏi có từ để hỏi ở quá khứ: Wh- + did + S + V? Động từ go đã ở dạng nguyên mẫu nên cần did.",
      },
    ],
  },

  // ───────────────────────────── 2. PAST CONTINUOUS ─────────────────────────────
  {
    id: "a2-past-continuous",
    level: "A2",
    title: "Thì quá khứ tiếp diễn",
    titleEn: "Past continuous",
    summary:
      "Thì quá khứ tiếp diễn diễn tả một hành động đang diễn ra tại một thời điểm trong quá khứ. Bài học giúp bạn dùng was/were + V-ing, phân biệt when và while, và kể về một hành động đang xảy ra thì bị cắt ngang.",
    sections: [
      {
        heading: "Khi nào dùng thì quá khứ tiếp diễn?",
        text: "Thì quá khứ tiếp diễn diễn tả một hành động ĐANG diễn ra (chưa kết thúc) tại một thời điểm hoặc trong một khoảng thời gian trong quá khứ.",
        points: [
          "Hành động đang xảy ra tại một thời điểm cụ thể trong quá khứ: At 8 p.m. yesterday, I was having dinner.",
          "Hành động đang xảy ra thì bị một hành động khác (ngắn hơn) cắt ngang: I was taking a shower when the phone rang.",
          "Hai hành động cùng đang diễn ra song song: While I was cooking, my husband was watching TV.",
          "Miêu tả bối cảnh khi mở đầu một câu chuyện: The sun was shining and the birds were singing.",
        ],
        examples: [
          { en: "At 8 p.m. yesterday, I was having dinner.", vi: "Lúc 8 giờ tối qua, tôi đang ăn tối." },
          {
            en: "The sun was shining and the birds were singing.",
            vi: "Mặt trời đang chiếu sáng và chim đang hót.",
          },
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Khẳng định", pattern: "S + was/were + V-ing" },
          { label: "Phủ định", pattern: "S + was/were + not + V-ing (wasn't / weren't)" },
          { label: "Câu hỏi", pattern: "Was/Were + S + V-ing?" },
          { label: "Trả lời ngắn", pattern: "Yes, S + was/were. / No, S + wasn't/weren't." },
          { label: "Câu hỏi có từ để hỏi", pattern: "Wh- + was/were + S + V-ing?" },
        ],
        points: [
          "I / he / she / it / danh từ số ít → was; you / we / they / danh từ số nhiều → were.",
          "Cách thêm -ing giống thì hiện tại tiếp diễn: make → making, run → running, lie → lying.",
        ],
        examples: [
          { en: "She was reading a book at 10 p.m.", vi: "Lúc 10 giờ tối, cô ấy đang đọc sách." },
          {
            en: "We weren't sleeping when you called.",
            vi: "Lúc bạn gọi, chúng tôi chưa ngủ.",
            note: "Nghĩa là lúc đó chúng tôi vẫn còn thức.",
          },
          { en: "What were you doing at 9 o'clock last night?", vi: "Lúc 9 giờ tối qua bạn đang làm gì?" },
        ],
      },
      {
        heading: "Hành động bị cắt ngang: when và while",
        text: "Khi một hành động dài đang diễn ra thì một hành động ngắn xen vào: hành động dài dùng quá khứ tiếp diễn, hành động ngắn dùng quá khứ đơn.",
        points: [
          "when + quá khứ đơn (hành động ngắn, xen vào): I was walking home when it started to rain.",
          "while + quá khứ tiếp diễn (hành động dài, đang diễn ra): While I was walking home, it started to rain.",
          "Khi mệnh đề when/while đứng đầu câu, đặt dấu phẩy sau mệnh đề đó.",
          "Hai hành động song song thường dùng quá khứ tiếp diễn ở cả hai vế: While she was studying, her brother was playing games.",
        ],
        examples: [
          { en: "I was taking a shower when the phone rang.", vi: "Tôi đang tắm thì điện thoại reo." },
          { en: "While we were having dinner, the lights went out.", vi: "Trong lúc chúng tôi đang ăn tối thì mất điện." },
          {
            en: "He was driving too fast when the police stopped him.",
            vi: "Anh ấy đang lái xe quá nhanh thì bị cảnh sát chặn lại.",
          },
          {
            en: "While she was studying, her brother was playing games.",
            vi: "Trong khi cô ấy đang học thì em trai cô ấy đang chơi game.",
          },
        ],
      },
      {
        heading: "Dấu hiệu nhận biết và lưu ý",
        points: [
          "Dấu hiệu thường gặp: at + giờ + thời gian quá khứ (at 7 o'clock yesterday), at this time yesterday / last week, at that moment, while, when.",
          "So sánh: When I arrived, they were having dinner. (Họ đang ăn dở thì tôi đến.) ≠ When I arrived, they had dinner. (Tôi đến rồi họ mới ăn tối.)",
          "Động từ chỉ trạng thái (know, like, love, want, need, believe, understand, own...) thường không dùng ở dạng tiếp diễn: I knew the answer (KHÔNG nói: I was knowing the answer).",
          "Quá khứ tiếp diễn không cho biết hành động đã xong hay chưa; quá khứ đơn cho biết hành động đã hoàn tất: I was writing an email at 9 p.m. (lúc đó đang viết) – I wrote an email at 9 p.m. (đã viết xong).",
        ],
        examples: [
          {
            en: "When I arrived, they were having dinner.",
            vi: "Khi tôi đến, họ đang ăn tối.",
          },
          { en: "What were you doing at this time yesterday?", vi: "Giờ này hôm qua bạn đang làm gì?" },
        ],
      },
      {
        heading: "So sánh quá khứ đơn và quá khứ tiếp diễn",
        table: {
          head: ["Tiêu chí", "Quá khứ đơn", "Quá khứ tiếp diễn"],
          rows: [
            ["Công thức", "S + V2 / S + didn't + V", "S + was/were + V-ing"],
            ["Ý nghĩa", "Hành động đã xảy ra và kết thúc", "Hành động đang diễn ra tại một thời điểm"],
            ["Trong câu có when/while", "Hành động ngắn, xen vào", "Hành động dài, bị cắt ngang"],
            [
              "Dấu hiệu",
              "yesterday, last..., ... ago, when + quá khứ đơn",
              "at + giờ + thời gian quá khứ, at this time yesterday, at that moment, while",
            ],
            ["Ví dụ", "The phone rang.", "I was cooking."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "I was watch TV when you called.",
        right: "I was watching TV when you called.",
        why: "Sau was/were phải dùng V-ing, không dùng động từ nguyên mẫu.",
      },
      {
        wrong: "They was playing football.",
        right: "They were playing football.",
        why: "Chủ ngữ They đi với were, không đi với was.",
      },
      {
        wrong: "I was cooking when the phone was ringing.",
        right: "I was cooking when the phone rang.",
        why: "Hành động ngắn xen vào (điện thoại reo) dùng quá khứ đơn; chỉ hành động dài đang diễn ra mới dùng quá khứ tiếp diễn.",
      },
      {
        wrong: "I was knowing the answer.",
        right: "I knew the answer.",
        why: "know là động từ chỉ trạng thái, thường không dùng ở dạng tiếp diễn.",
      },
      {
        wrong: "What did you doing at 8 p.m. yesterday?",
        right: "What were you doing at 8 p.m. yesterday?",
        why: "Câu hỏi ở quá khứ tiếp diễn dùng was/were + S + V-ing, không dùng did.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "At 9 p.m. yesterday, I ___ dinner with my family.",
        options: ["have", "was having", "had having", "am having"],
        answer: 1,
        explain:
          "“At 9 p.m. yesterday” là một thời điểm cụ thể trong quá khứ, hành động đang diễn ra lúc đó → was having. “had having” sai cấu trúc.",
      },
      {
        kind: "choice",
        question: "They ___ football when it started to rain.",
        options: ["was playing", "were play", "were playing", "are playing"],
        answer: 2,
        explain:
          "Hành động dài đang diễn ra bị cơn mưa cắt ngang → quá khứ tiếp diễn. They đi với were, và sau were phải là V-ing.",
      },
      {
        kind: "choice",
        question: "___ I was walking home, I saw an accident.",
        options: ["While", "During", "Until"],
        answer: 0,
        explain:
          "While + mệnh đề ở quá khứ tiếp diễn (hành động đang diễn ra). During chỉ đi với danh từ (during the night), không đi với mệnh đề. Until (cho đến khi) không hợp nghĩa.",
      },
      {
        kind: "choice",
        question: "My mother was cooking when I ___ home.",
        options: ["get", "got", "have got", "am getting"],
        answer: 1,
        explain:
          "Hành động ngắn xen vào khi mẹ đang nấu ăn → quá khứ đơn: got. Các đáp án còn lại không phải thì quá khứ.",
      },
      {
        kind: "choice",
        question: "Câu nào đúng?",
        options: ["I was knowing the answer.", "I was know the answer.", "I knew the answer."],
        answer: 2,
        explain:
          "know là động từ chỉ trạng thái nên không dùng dạng tiếp diễn → I knew the answer. “was know” sai cấu trúc.",
      },
      {
        kind: "fill",
        question: "What ___ you doing at 10 o'clock last night?",
        answers: ["were"],
        hint: "be",
        explain: "Câu hỏi quá khứ tiếp diễn: Wh- + was/were + S + V-ing? Chủ ngữ you đi với were.",
      },
      {
        kind: "fill",
        question: "At this time yesterday, I ___ on the beach.",
        answers: ["was lying"],
        hint: "lie",
        explain:
          "“At this time yesterday” → hành động đang diễn ra tại thời điểm đó → was + V-ing. Chú ý chính tả: lie → lying (ie đổi thành y).",
      },
      {
        kind: "fill",
        question: "I couldn't answer the phone because at that moment I ___ a shower.",
        answers: ["was having"],
        hint: "have",
        explain:
          "“at that moment” → hành động đang diễn ra trong quá khứ → was having. Ở đây have mang nghĩa hành động (have a shower = tắm) nên dùng được dạng tiếp diễn.",
      },
    ],
  },

  // ───────────────────────────── 3. PRESENT PERFECT ─────────────────────────────
  {
    id: "a2-present-perfect",
    level: "A2",
    title: "Thì hiện tại hoàn thành",
    titleEn: "Present perfect",
    summary:
      "Thì hiện tại hoàn thành nối quá khứ với hiện tại: kinh nghiệm, việc vừa xảy ra, việc kéo dài đến bây giờ. Bài học gồm have/has + V3, ever/never, just/already/yet, for/since, been và gone, và cách phân biệt với quá khứ đơn.",
    sections: [
      {
        heading: "Thì hiện tại hoàn thành là gì?",
        text: "Thì hiện tại hoàn thành diễn tả một việc đã xảy ra trong quá khứ nhưng có liên quan tới hiện tại. Điểm mấu chốt: KHÔNG nói rõ thời điểm xảy ra.",
        points: [
          "Kinh nghiệm (đã từng / chưa từng): I have been to Japan.",
          "Hành động vừa xảy ra hoặc có kết quả ở hiện tại: I've lost my keys. (Bây giờ tôi không có chìa khóa.)",
          "Hành động hoặc tình trạng bắt đầu trong quá khứ và kéo dài đến hiện tại: We have lived here for five years.",
        ],
        examples: [
          { en: "I've lost my keys.", vi: "Tôi làm mất chìa khóa rồi.", note: "Kết quả: bây giờ không có chìa khóa." },
          { en: "We have lived here for five years.", vi: "Chúng tôi đã sống ở đây được năm năm.", note: "Đến giờ vẫn đang sống ở đây." },
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Khẳng định", pattern: "S + have/has + V3" },
          { label: "Phủ định", pattern: "S + have/has + not + V3 (haven't / hasn't)" },
          { label: "Câu hỏi", pattern: "Have/Has + S + V3?" },
          { label: "Trả lời ngắn", pattern: "Yes, S + have/has. / No, S + haven't/hasn't." },
          { label: "Câu hỏi có từ để hỏi", pattern: "Wh- + have/has + S + V3?" },
        ],
        points: [
          "I / you / we / they / danh từ số nhiều → have; he / she / it / danh từ số ít → has.",
          "Viết tắt: I've, you've, we've, they've, he's, she's, it's. Chú ý: she's có thể là she has hoặc she is; nhìn động từ phía sau để phân biệt (she's gone = she has gone; she's going = she is going).",
          "V3 của động từ có quy tắc giống V2 (thêm -ed): worked, played, studied. Động từ bất quy tắc dùng cột thứ ba: go – went – gone, see – saw – seen, eat – ate – eaten, write – wrote – written.",
        ],
        examples: [
          { en: "She has finished her homework.", vi: "Cô ấy đã làm xong bài tập về nhà." },
          { en: "I haven't seen that film.", vi: "Tôi chưa xem bộ phim đó." },
          { en: "Have you eaten? – Yes, I have.", vi: "Bạn ăn chưa? – Mình ăn rồi." },
        ],
      },
      {
        heading: "Kinh nghiệm: ever / never",
        text: "Dùng thì hiện tại hoàn thành để nói về những điều đã từng hoặc chưa từng làm trong đời (tính đến bây giờ), không quan trọng là khi nào.",
        points: [
          "ever (đã từng) thường dùng trong câu hỏi, đứng trước V3: Have you ever...?",
          "never (chưa bao giờ) đã mang nghĩa phủ định, đứng trước V3; không dùng thêm not: I have never... (KHÔNG nói: I haven't never...).",
          "Hay dùng với so sánh nhất: It's the best film I've ever seen.",
          "Nếu muốn nói rõ khi nào, chuyển sang quá khứ đơn: Have you ever been to Hue? – Yes, I went there last year.",
        ],
        examples: [
          { en: "Have you ever been to Japan?", vi: "Bạn đã từng đến Nhật Bản chưa?" },
          { en: "I've never eaten durian.", vi: "Tôi chưa bao giờ ăn sầu riêng." },
          { en: "It's the best film I've ever seen.", vi: "Đó là bộ phim hay nhất tôi từng xem." },
        ],
      },
      {
        heading: "just / already / yet",
        points: [
          "just (vừa mới): đứng giữa have/has và V3. I've just had lunch.",
          "already (đã ... rồi, thường là sớm hơn mong đợi): thường đứng giữa have/has và V3, dùng trong câu khẳng định. She has already left.",
          "yet (chưa / đã ... chưa): đứng cuối câu, dùng trong câu phủ định và câu hỏi. I haven't finished yet. / Have you finished yet?",
          "Trong tiếng Anh-Mỹ, người ta cũng hay dùng quá khứ đơn với just/already/yet (Did you eat yet?), nhưng dạng hiện tại hoàn thành luôn đúng và là dạng chuẩn trong bài thi.",
        ],
        examples: [
          { en: "I've just had lunch.", vi: "Tôi vừa ăn trưa xong." },
          { en: "The train has already left.", vi: "Tàu đã chạy mất rồi." },
          { en: "Has the film started yet? – No, not yet.", vi: "Phim đã bắt đầu chưa? – Chưa." },
        ],
      },
      {
        heading: "for / since",
        text: "Dùng thì hiện tại hoàn thành với for và since để nói về việc bắt đầu trong quá khứ và vẫn còn tiếp diễn đến bây giờ. Hỏi “bao lâu rồi” dùng How long have/has ...?",
        table: {
          head: ["Từ", "Ý nghĩa", "Đi với", "Ví dụ"],
          rows: [
            [
              "for",
              "trong (một khoảng thời gian)",
              "khoảng thời gian: for two hours, for three years, for a long time",
              "I've known her for ten years.",
            ],
            [
              "since",
              "từ (một mốc thời gian)",
              "mốc thời gian: since 2020, since Monday, since 9 o'clock, since I was a child",
              "I've known her since 2015.",
            ],
          ],
        },
        points: [
          "Sau since có thể là một mệnh đề ở quá khứ đơn: since I was a child, since we moved here.",
          "So sánh: I lived in Hue for ten years. (quá khứ đơn: giờ không còn sống ở đó) – I have lived in Hue for ten years. (hiện tại hoàn thành: vẫn đang sống ở đó).",
        ],
        examples: [
          { en: "How long have you lived here? – For six months.", vi: "Bạn sống ở đây bao lâu rồi? – Sáu tháng rồi." },
          { en: "She has worked here since she left university.", vi: "Cô ấy làm việc ở đây từ khi ra trường." },
        ],
      },
      {
        heading: "been và gone; so sánh với quá khứ đơn",
        points: [
          "have/has been to + nơi chốn: đã đến đó và đã quay về. She has been to Paris. (Cô ấy từng đến Paris, giờ không còn ở đó.)",
          "have/has gone to + nơi chốn: đã đi đến đó và hiện chưa về. She has gone to Paris. (Cô ấy đã đi Paris, bây giờ đang ở đó hoặc đang trên đường đi.)",
        ],
        table: {
          head: ["Hiện tại hoàn thành", "Quá khứ đơn"],
          rows: [
            [
              "Không nói rõ thời điểm; quan trọng là kinh nghiệm hoặc kết quả đến bây giờ",
              "Có thời điểm xác định, sự việc đã kết thúc",
            ],
            [
              "Đi với: ever, never, just, already, yet, for, since, so far, recently, today (khi hôm nay chưa hết)",
              "Đi với: yesterday, last..., ... ago, in 2019, When...?",
            ],
            ["I've lost my phone. (Bây giờ vẫn chưa tìm thấy.)", "I lost my phone last week. (Chuyện của tuần trước.)"],
            ["Have you seen Tom today?", "Did you see Tom yesterday?"],
          ],
        },
        examples: [
          { en: "Tom isn't here. He's gone to the bank.", vi: "Tom không có ở đây. Anh ấy ra ngân hàng rồi." },
          { en: "I've been to Phu Quoc twice.", vi: "Tôi đã đến Phú Quốc hai lần." },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "I have seen this film last week.",
        right: "I saw this film last week.",
        why: "Có thời điểm xác định trong quá khứ (last week) thì phải dùng quá khứ đơn, không dùng hiện tại hoàn thành.",
      },
      {
        wrong: "I live here since 2020.",
        right: "I have lived here since 2020.",
        why: "Việc bắt đầu trong quá khứ và kéo dài đến nay (since) dùng hiện tại hoàn thành. Tiếng Việt nói “tôi sống ở đây từ 2020” nên người học hay dùng nhầm hiện tại đơn.",
      },
      {
        wrong: "She has went home.",
        right: "She has gone home.",
        why: "Sau has/have phải là V3. go – went – gone, nên dùng gone.",
      },
      {
        wrong: "I have lived here since three years.",
        right: "I have lived here for three years.",
        why: "three years là một khoảng thời gian nên dùng for; since chỉ đi với mốc thời gian.",
      },
      {
        wrong: "I have finished already my homework.",
        right: "I have already finished my homework.",
        why: "already thường đứng giữa have/has và V3 (cũng có thể đứng cuối câu), không chen giữa động từ và tân ngữ.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "Have you ever ___ to Japan?",
        options: ["go", "went", "been", "be"],
        answer: 2,
        explain:
          "Hỏi về kinh nghiệm: Have you ever been to...? Sau have phải là V3; been là V3 của be. go và be là nguyên mẫu, went là V2.",
      },
      {
        kind: "choice",
        question: "I have lived in Hanoi ___ 2018.",
        options: ["since", "for", "ago", "in"],
        answer: 0,
        explain: "2018 là một mốc thời gian → since. for đi với khoảng thời gian (for six years).",
      },
      {
        kind: "choice",
        question: "She ___ her keys, so she can't open the door.",
        options: ["have lost", "has lost", "has lose", "is losing"],
        answer: 1,
        explain:
          "Kết quả ở hiện tại (bây giờ không mở được cửa) → hiện tại hoàn thành. She đi với has, và sau has là V3 lost.",
      },
      {
        kind: "choice",
        question: "I ___ that film last Saturday.",
        options: ["have seen", "have saw", "see", "saw"],
        answer: 3,
        explain:
          "“last Saturday” là thời điểm xác định trong quá khứ → quá khứ đơn (saw). Không dùng have seen khi có thời điểm cụ thể đã qua.",
      },
      {
        kind: "choice",
        question: "Tom isn't here. He ___ to the supermarket.",
        options: ["has been", "have gone", "has gone"],
        answer: 2,
        explain:
          "Tom đã đi và chưa về (không có ở đây) → has gone. has been to nghĩa là đã đến rồi quay về, mâu thuẫn với “Tom isn't here”.",
      },
      {
        kind: "fill",
        question: "We haven't finished our project ___.",
        answers: ["yet"],
        hint: "already / yet",
        explain: "Câu phủ định với nghĩa “chưa” → yet, đứng cuối câu. already dùng trong câu khẳng định.",
      },
      {
        kind: "fill",
        question: "She ___ in this company for five years, and she still loves her job.",
        answers: ["has worked", "has been working"],
        hint: "work",
        explain:
          "Bắt đầu trong quá khứ và vẫn tiếp tục đến bây giờ (for five years, still) → hiện tại hoàn thành: has worked (has been working cũng đúng).",
      },
      {
        kind: "fill",
        question: "I ___ sushi. What does it taste like?",
        answers: ["have never eaten", "'ve never eaten"],
        hint: "never / eat",
        explain:
          "Nói về kinh nghiệm chưa từng có → have never + V3. eat – ate – eaten, nên dùng eaten. Không thêm not vì never đã mang nghĩa phủ định.",
      },
    ],
  },

  // ───────────────────────────── 4. FUTURE ─────────────────────────────
  {
    id: "a2-future",
    level: "A2",
    title: "Tương lai: will, be going to và hiện tại tiếp diễn",
    titleEn: "Future forms: will, be going to, present continuous",
    summary:
      "Tiếng Anh có nhiều cách nói về tương lai. Bài này giúp bạn chọn đúng giữa will (quyết định tức thì, dự đoán, lời hứa), be going to (dự định, dự đoán có dấu hiệu) và hiện tại tiếp diễn (kế hoạch đã sắp xếp).",
    sections: [
      {
        heading: "Ba cách nói về tương lai",
        text: "Tiếng Anh không có một “thì tương lai” duy nhất. Ở trình độ A2 cần nắm ba cách: will, be going to và thì hiện tại tiếp diễn. Việc chọn cách nào phụ thuộc vào việc bạn quyết định từ khi nào và kế hoạch đã chắc chắn đến đâu.",
        points: [
          "will: quyết định ngay lúc nói, dự đoán theo ý kiến, lời hứa, lời đề nghị giúp đỡ.",
          "be going to: dự định đã quyết từ trước, dự đoán dựa trên dấu hiệu đang thấy.",
          "Hiện tại tiếp diễn: kế hoạch đã sắp xếp cụ thể (đã hẹn, đã đặt vé, có thời gian hoặc địa điểm rõ ràng).",
        ],
      },
      {
        heading: "will + V",
        formulas: [
          { label: "Khẳng định", pattern: "S + will ('ll) + V" },
          { label: "Phủ định", pattern: "S + will not (won't) + V" },
          { label: "Câu hỏi", pattern: "Will + S + V?" },
          { label: "Trả lời ngắn", pattern: "Yes, S + will. / No, S + won't." },
        ],
        points: [
          "Quyết định ngay lúc nói (trước đó chưa định làm): It's cold. I'll close the window.",
          "Dự đoán dựa trên ý kiến, niềm tin (hay đi với I think, I'm sure, probably, maybe): I think it will be sunny tomorrow.",
          "Lời hứa: I'll call you tonight. I won't be late.",
          "Đề nghị giúp đỡ hoặc nhờ ai làm gì: I'll carry your bag. / Will you help me, please?",
          "Với I/we, khi đề nghị hoặc gợi ý dưới dạng câu hỏi, dùng Shall: Shall I open the window? / Shall we go?",
        ],
        examples: [
          { en: "It's cold. I'll close the window.", vi: "Lạnh quá. Để tôi đóng cửa sổ." },
          { en: "I think it will be sunny tomorrow.", vi: "Tôi nghĩ ngày mai trời sẽ nắng." },
          { en: "Don't worry. I won't tell anyone.", vi: "Đừng lo. Tôi sẽ không nói với ai đâu." },
        ],
      },
      {
        heading: "be going to + V",
        formulas: [
          { label: "Khẳng định", pattern: "S + am/is/are + going to + V" },
          { label: "Phủ định", pattern: "S + am/is/are + not + going to + V" },
          { label: "Câu hỏi", pattern: "Am/Is/Are + S + going to + V?" },
        ],
        points: [
          "Dự định, kế hoạch đã quyết định từ trước thời điểm nói: I'm going to learn Japanese next year.",
          "Dự đoán dựa trên dấu hiệu, bằng chứng nhìn thấy ở hiện tại: Look at those black clouds! It's going to rain.",
        ],
        examples: [
          {
            en: "We're going to visit our grandparents this weekend.",
            vi: "Cuối tuần này chúng tôi định về thăm ông bà.",
          },
          { en: "Look at those black clouds! It's going to rain.", vi: "Nhìn mấy đám mây đen kia kìa! Trời sắp mưa rồi." },
          { en: "Be careful! You're going to fall.", vi: "Cẩn thận! Bạn sắp ngã đấy." },
          { en: "Are you going to buy a new laptop?", vi: "Bạn có định mua laptop mới không?" },
        ],
      },
      {
        heading: "Hiện tại tiếp diễn cho kế hoạch đã sắp xếp",
        text: "Dùng thì hiện tại tiếp diễn khi kế hoạch đã được sắp xếp xong với người khác hoặc đã đặt chỗ (giống như đã ghi vào lịch). Thường có thời gian cụ thể đi kèm để người nghe hiểu là đang nói về tương lai.",
        formulas: [{ label: "Kế hoạch đã sắp xếp", pattern: "S + am/is/are + V-ing + (thời gian tương lai)" }],
        points: [
          "Trong nhiều trường hợp có thể dùng be going to thay thế (I'm going to meet Lan tonight), nhưng hiện tại tiếp diễn nhấn mạnh việc đã sắp xếp xong.",
          "Với kế hoạch đã hẹn trước, người bản xứ thường không dùng will; dùng hiện tại tiếp diễn hoặc be going to tự nhiên hơn.",
        ],
        examples: [
          { en: "I'm meeting Lan at 7 o'clock tonight.", vi: "Tối nay 7 giờ tôi gặp Lan.", note: "Đã hẹn từ trước." },
          { en: "We're flying to Da Nang on Friday.", vi: "Thứ Sáu chúng tôi bay đi Đà Nẵng.", note: "Đã đặt vé." },
          { en: "What are you doing tomorrow evening?", vi: "Tối mai bạn làm gì?" },
        ],
      },
      {
        heading: "Dấu hiệu nhận biết và lưu ý",
        points: [
          "Các từ chỉ tương lai: tomorrow, tonight, next week / month / year, soon, this weekend, in two days (hai ngày nữa).",
          "Các từ này đi được với cả ba cấu trúc; cần dựa vào ý nghĩa (quyết định lúc nói? đã định trước? đã sắp xếp?) để chọn.",
          "I think / I'm sure / probably / maybe thường đi với will. Vị trí của probably: It will probably rain. / It probably won't rain.",
          "Phủ định của will là won't (will not), KHÔNG nói: will don't.",
        ],
      },
      {
        heading: "Bảng so sánh",
        table: {
          head: ["Cấu trúc", "Dùng khi", "Ví dụ"],
          rows: [
            ["will + V", "Quyết định ngay lúc nói", "The phone's ringing. – I'll get it."],
            ["will + V", "Dự đoán theo ý kiến; lời hứa; đề nghị", "I think she'll like the present."],
            ["be going to + V", "Dự định đã có từ trước", "I'm going to study abroad next year."],
            ["be going to + V", "Dự đoán dựa vào dấu hiệu ở hiện tại", "The sky is so dark. It's going to rain."],
            ["am/is/are + V-ing", "Kế hoạch đã sắp xếp (hẹn, đặt vé)", "We're having a party on Saturday."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "I will to call you tomorrow.",
        right: "I will call you tomorrow.",
        why: "Sau will là động từ nguyên mẫu không có to.",
      },
      {
        wrong: "She going to visit her grandma.",
        right: "She's going to visit her grandma.",
        why: "Cấu trúc be going to cần có am/is/are; người học hay bỏ mất động từ be.",
      },
      {
        wrong: "The phone is ringing. – I'm going to answer it.",
        right: "The phone is ringing. – I'll answer it.",
        why: "Quyết định ngay lúc nói (không định trước) → dùng will.",
      },
      {
        wrong: "Do you come to my party on Saturday?",
        right: "Are you coming to my party on Saturday?",
        why: "Hỏi về kế hoạch đã sắp xếp trong tương lai → dùng hiện tại tiếp diễn, không dùng hiện tại đơn.",
      },
      {
        wrong: "It will don't rain tomorrow.",
        right: "It won't rain tomorrow.",
        why: "Phủ định của will là will not (won't), không dùng don't.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "The phone is ringing. – OK, I ___ it.",
        options: ["answer", "am going to answer", "answered", "will answer"],
        answer: 3,
        explain:
          "Quyết định ngay lúc nói, khi nghe điện thoại reo → will answer. be going to dùng cho dự định đã có từ trước.",
      },
      {
        kind: "choice",
        question: "I've already decided. I ___ study medicine at university.",
        options: ["will", "going to", "am going to", "am"],
        answer: 2,
        explain:
          "“I've already decided” → dự định đã quyết từ trước → am going to. will dùng cho quyết định ngay lúc nói; “going to” thiếu am.",
      },
      {
        kind: "choice",
        question: "I ___ my dentist at 10 o'clock tomorrow morning. I booked the appointment last week.",
        options: ["am seeing", "see", "saw", "will to see"],
        answer: 0,
        explain:
          "Lịch hẹn đã đặt trước, có giờ cụ thể → hiện tại tiếp diễn: am seeing. Hiện tại đơn (see) không dùng cho cuộc hẹn cá nhân; “will to see” sai cấu trúc.",
      },
      {
        kind: "choice",
        question: "I think Vietnam ___ the match tonight.",
        options: ["is winning", "will win", "wins", "won"],
        answer: 1,
        explain: "Dự đoán dựa trên ý kiến cá nhân (I think) → will win.",
      },
      {
        kind: "choice",
        question: "Look at those black clouds! It ___ rain.",
        options: ["is going to", "are going to", "going to", "is going"],
        answer: 0,
        explain:
          "Dự đoán dựa trên dấu hiệu nhìn thấy (mây đen) → be going to. Chủ ngữ It đi với is → is going to. “going to” thiếu is; “is going” thiếu to.",
      },
      {
        kind: "fill",
        question: "I'm sure you ___ the exam tomorrow. You've studied so hard.",
        answers: ["will pass", "'ll pass", "are going to pass", "'re going to pass"],
        hint: "pass",
        explain: "Dự đoán với “I'm sure” → will pass. are going to pass cũng chấp nhận được vì có dấu hiệu (bạn đã học rất chăm).",
      },
      {
        kind: "fill",
        question: "Don't worry, I ___ anyone your secret. I promise!",
        answers: ["won't tell", "will not tell", "am not going to tell", "'m not going to tell"],
        hint: "not tell",
        explain: "Lời hứa → will. Phủ định: won't (will not) + V → won't tell.",
      },
      {
        kind: "fill",
        question: "What ___ you going to do this weekend?",
        answers: ["are"],
        hint: "be",
        explain: "Câu hỏi với be going to: Wh- + am/is/are + S + going to + V? Chủ ngữ you đi với are.",
      },
    ],
  },

  // ───────────────────────────── 5. COMPARISONS ─────────────────────────────
  {
    id: "a2-comparisons",
    level: "A2",
    title: "So sánh hơn, so sánh nhất và so sánh bằng",
    titleEn: "Comparatives, superlatives and as ... as",
    summary:
      "Bài học giúp bạn so sánh người và vật: so sánh hơn (taller, more expensive), so sánh nhất (the tallest, the most expensive), so sánh bằng (as ... as, not as ... as), cùng các tính từ bất quy tắc good, bad, far.",
    sections: [
      {
        heading: "Ba kiểu so sánh",
        points: [
          "So sánh hơn: so sánh giữa HAI người/vật. Lan is taller than Mai.",
          "So sánh nhất: một người/vật nổi bật nhất trong một nhóm từ BA trở lên. Lan is the tallest in the class.",
          "So sánh bằng: hai người/vật giống nhau ở một mức độ. Lan is as tall as her mum.",
        ],
        examples: [
          { en: "Lan is taller than Mai.", vi: "Lan cao hơn Mai." },
          { en: "Lan is the tallest in the class.", vi: "Lan cao nhất lớp." },
        ],
      },
      {
        heading: "Tính từ ngắn và tính từ dài",
        points: [
          "Tính từ ngắn: có 1 âm tiết (tall, big, cheap) và tính từ 2 âm tiết tận cùng bằng -y (happy, easy, busy) → thêm -er / -est.",
          "Tính từ dài: các tính từ có từ 2 âm tiết trở lên còn lại (careful, modern, expensive, beautiful, interesting) → dùng more / most.",
          "Một số tính từ 2 âm tiết dùng được cả hai cách: clever → cleverer / more clever, quiet → quieter / more quiet. Nếu không chắc, với tính từ 2 âm tiết (trừ loại tận cùng -y) dùng more / most thường an toàn.",
          "Tính từ tận cùng -ed như tired, bored dùng more / most: more tired, the most bored.",
        ],
        table: {
          head: ["Quy tắc", "So sánh hơn", "So sánh nhất"],
          rows: [
            ["Thông thường: + er / + est", "cheap → cheaper", "the cheapest"],
            ["Tận cùng -e: + r / + st", "nice → nicer, large → larger", "the nicest, the largest"],
            ["Phụ âm + y: đổi y → i rồi + er / + est", "happy → happier, easy → easier", "the happiest, the easiest"],
            [
              "1 nguyên âm + 1 phụ âm cuối: gấp đôi phụ âm",
              "big → bigger, hot → hotter, thin → thinner",
              "the biggest, the hottest, the thinnest",
            ],
            ["Tính từ dài: more / most", "expensive → more expensive", "the most expensive"],
          ],
        },
      },
      {
        heading: "So sánh hơn",
        formulas: [
          { label: "Tính từ ngắn", pattern: "S + be + adj-er + than + O" },
          { label: "Tính từ dài", pattern: "S + be + more + adj + than + O" },
          { label: "Kém hơn", pattern: "S + be + less + adj + than + O" },
        ],
        points: [
          "Nhấn mạnh mức độ: much / a lot / far + so sánh hơn (much bigger = lớn hơn nhiều); a bit / a little + so sánh hơn (a bit cheaper = rẻ hơn một chút).",
          "Sau than có thể dùng tân ngữ (than me, than him) – phổ biến trong văn nói; hoặc chủ ngữ + trợ động từ (than I am, than he does).",
          "Không dùng more cùng với đuôi -er: taller (KHÔNG nói: more taller).",
        ],
        examples: [
          { en: "My brother is taller than me.", vi: "Anh trai tôi cao hơn tôi." },
          { en: "This phone is more expensive than that one.", vi: "Chiếc điện thoại này đắt hơn chiếc kia." },
          { en: "Today is much hotter than yesterday.", vi: "Hôm nay nóng hơn hôm qua nhiều." },
          { en: "The bus is less comfortable than the train.", vi: "Xe buýt kém thoải mái hơn tàu hỏa." },
        ],
      },
      {
        heading: "So sánh nhất",
        formulas: [
          { label: "Tính từ ngắn", pattern: "S + be + the + adj-est + (N)" },
          { label: "Tính từ dài", pattern: "S + be + the most + adj + (N)" },
        ],
        points: [
          "Luôn có the trước dạng so sánh nhất: the biggest, the most beautiful.",
          "Dùng in + nơi chốn / nhóm: the tallest in my class, the highest mountain in Vietnam.",
          "Dùng of + số lượng / khoảng thời gian: the youngest of the three, the best day of my life.",
          "Hay đi kèm hiện tại hoàn thành với ever: the best film I've ever seen.",
        ],
        examples: [
          { en: "Fansipan is the highest mountain in Vietnam.", vi: "Fansipan là ngọn núi cao nhất Việt Nam." },
          {
            en: "This is the most beautiful beach I've ever seen.",
            vi: "Đây là bãi biển đẹp nhất mà tôi từng thấy.",
          },
          { en: "Lan is the youngest of the three sisters.", vi: "Lan là người nhỏ tuổi nhất trong ba chị em." },
        ],
      },
      {
        heading: "Tính từ bất quy tắc",
        table: {
          head: ["Tính từ", "So sánh hơn", "So sánh nhất"],
          rows: [
            ["good (tốt, giỏi)", "better", "the best"],
            ["bad (tệ)", "worse", "the worst"],
            ["far (xa)", "farther / further", "the farthest / the furthest"],
            ["many / much (nhiều)", "more", "the most"],
            ["little (ít)", "less", "the least"],
          ],
        },
        points: [
          "Trạng từ well cũng có dạng better – the best: She sings better than me.",
          "further còn có nghĩa “thêm, hơn nữa”: further information (thông tin thêm).",
        ],
        examples: [
          { en: "My English is better than it was last year.", vi: "Tiếng Anh của tôi giỏi hơn năm ngoái." },
          { en: "That was the worst day of my life.", vi: "Đó là ngày tồi tệ nhất trong đời tôi." },
        ],
      },
      {
        heading: "So sánh bằng: as ... as / not as ... as",
        formulas: [
          { label: "Bằng", pattern: "S + be + as + adj + as + O" },
          { label: "Không bằng", pattern: "S + be + not as (so) + adj + as + O" },
        ],
        points: [
          "Giữa as ... as luôn là tính từ / trạng từ ở dạng nguyên: as tall as (KHÔNG nói: as taller as).",
          "not as ... as = kém hơn: Hue is not as big as Hanoi = Hue is smaller than Hanoi.",
          "Có thể dùng với trạng từ: He runs as fast as his brother.",
          "the same as = giống với: Your phone is the same as mine.",
        ],
        examples: [
          { en: "My sister is as tall as my mum.", vi: "Chị gái tôi cao bằng mẹ tôi." },
          { en: "Hue is not as big as Hanoi.", vi: "Huế không lớn bằng Hà Nội." },
          { en: "He runs as fast as his brother.", vi: "Cậu ấy chạy nhanh bằng anh trai." },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "She is more taller than me.",
        right: "She is taller than me.",
        why: "tall là tính từ ngắn, chỉ thêm -er; không dùng thêm more.",
      },
      {
        wrong: "This is the most cheap phone in the shop.",
        right: "This is the cheapest phone in the shop.",
        why: "cheap là tính từ ngắn nên so sánh nhất là the cheapest.",
      },
      {
        wrong: "My English is gooder than before.",
        right: "My English is better than before.",
        why: "good là tính từ bất quy tắc: good – better – the best.",
      },
      {
        wrong: "He is as tall than his father.",
        right: "He is as tall as his father.",
        why: "So sánh bằng dùng as ... as; than chỉ dùng trong so sánh hơn.",
      },
      {
        wrong: "Lan is the tallest of my class.",
        right: "Lan is the tallest in my class.",
        why: "Sau so sánh nhất, dùng in với nơi chốn hoặc nhóm (in my class, in the world).",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "My brother is ___ than me.",
        options: ["tall", "taller", "more tall", "tallest"],
        answer: 1,
        explain: "Có than → so sánh hơn. tall là tính từ ngắn → taller. Không dùng more với tính từ ngắn.",
      },
      {
        kind: "choice",
        question: "This is the ___ film I have ever seen. It was so boring!",
        options: ["bad", "worse", "worst", "most bad"],
        answer: 2,
        explain: "Có the + “I have ever seen” → so sánh nhất. bad là bất quy tắc: bad – worse – the worst.",
      },
      {
        kind: "choice",
        question: "Today is not as hot ___ yesterday.",
        options: ["than", "like", "that", "as"],
        answer: 3,
        explain: "So sánh không bằng: not as + adj + as. than chỉ dùng sau dạng so sánh hơn (hotter than).",
      },
      {
        kind: "choice",
        question: "For me, English is ___ than Maths.",
        options: ["easier", "more easy", "easyer", "the easiest"],
        answer: 0,
        explain:
          "easy là tính từ 2 âm tiết tận cùng -y → đổi y thành i rồi thêm -er: easier. Có than nên không dùng so sánh nhất.",
      },
      {
        kind: "choice",
        question: "Hanoi is one of ___ cities in Asia.",
        options: ["more interesting", "the interestingest", "the most interesting", "most interesting"],
        answer: 2,
        explain:
          "“one of + the + so sánh nhất + danh từ số nhiều”. interesting là tính từ dài → the most interesting. Thiếu the là sai.",
      },
      {
        kind: "fill",
        question: "An elephant is ___ than a horse.",
        answers: ["bigger"],
        hint: "big",
        explain: "big có 1 nguyên âm + 1 phụ âm cuối → gấp đôi g rồi thêm -er: bigger.",
      },
      {
        kind: "fill",
        question: "Which planet is the ___ from the Sun?",
        answers: ["farthest", "furthest"],
        hint: "far",
        explain: "far là tính từ bất quy tắc: far – farther/further – the farthest/the furthest. Cả hai dạng đều đúng.",
      },
      {
        kind: "fill",
        question: "Your phone is ___ than mine. Mine only cost three million dong.",
        answers: ["more expensive"],
        hint: "expensive",
        explain: "expensive là tính từ dài → so sánh hơn dùng more expensive. Câu sau cho biết điện thoại của tôi rẻ, nên điện thoại của bạn đắt hơn.",
      },
    ],
  },

  // ───────────────────────────── 6. ADVERBS ─────────────────────────────
  {
    id: "a2-adverbs",
    level: "A2",
    title: "Trạng từ cách thức và trạng từ tần suất",
    titleEn: "Adverbs of manner and frequency",
    summary:
      "Bài học giúp bạn phân biệt tính từ và trạng từ, cách tạo trạng từ cách thức (quickly, well, hard, fast), và cách dùng trạng từ tần suất (always ... never) ở đúng vị trí trong câu.",
    sections: [
      {
        heading: "Tính từ và trạng từ khác nhau thế nào?",
        text: "Tính từ bổ nghĩa cho danh từ (cho biết người/vật như thế nào). Trạng từ cách thức bổ nghĩa cho động từ (cho biết hành động được làm như thế nào). Trạng từ cũng có thể bổ nghĩa cho tính từ hoặc trạng từ khác: really good, very quickly.",
        examples: [
          {
            en: "She is a careful driver.",
            vi: "Cô ấy là một người lái xe cẩn thận.",
            note: "careful là tính từ, bổ nghĩa cho danh từ driver.",
          },
          {
            en: "She drives carefully.",
            vi: "Cô ấy lái xe cẩn thận.",
            note: "carefully là trạng từ, bổ nghĩa cho động từ drives.",
          },
        ],
      },
      {
        heading: "Cách tạo trạng từ cách thức",
        table: {
          head: ["Quy tắc", "Ví dụ"],
          rows: [
            ["Thông thường: tính từ + -ly", "quick → quickly, slow → slowly, careful → carefully"],
            ["Tận cùng -y: đổi y → i rồi + -ly", "easy → easily, happy → happily, angry → angrily"],
            ["Tận cùng -le: bỏ e, thêm -y", "gentle → gently, terrible → terribly, possible → possibly"],
            ["Tận cùng -ic: thêm -ally", "basic → basically, automatic → automatically"],
            ["Bất quy tắc", "good → well; hard → hard; fast → fast; late → late; early → early"],
          ],
        },
        points: [
          "hardly KHÔNG phải trạng từ của hard; hardly nghĩa là “hầu như không”: I can hardly hear you. (Tôi hầu như không nghe thấy bạn.)",
          "lately nghĩa là “gần đây”, không phải “muộn”: I haven't seen him lately.",
          "Một số từ tận cùng -ly là tính từ chứ không phải trạng từ: friendly, lovely, lonely, ugly. Muốn diễn đạt như trạng từ, nói: in a friendly way.",
          "well cũng có thể là tính từ với nghĩa “khỏe”: I don't feel well today.",
        ],
      },
      {
        heading: "Vị trí của trạng từ cách thức",
        points: [
          "Thường đứng sau động từ: He speaks slowly.",
          "Nếu động từ có tân ngữ, trạng từ đứng sau tân ngữ (không chen giữa động từ và tân ngữ): She speaks English well. (KHÔNG nói: She speaks well English.)",
          "Có thể thêm very / really / quite trước trạng từ: He runs very fast.",
        ],
        examples: [
          { en: "Please drive slowly. The road is wet.", vi: "Làm ơn lái chậm thôi. Đường đang ướt." },
          { en: "She speaks English very well.", vi: "Cô ấy nói tiếng Anh rất giỏi." },
          { en: "He works hard every day.", vi: "Anh ấy làm việc chăm chỉ mỗi ngày." },
          { en: "The children ate their dinner quickly.", vi: "Bọn trẻ ăn tối rất nhanh." },
        ],
      },
      {
        heading: "Sau be và động từ nối: dùng tính từ",
        text: "Sau be và các động từ chỉ trạng thái hoặc cảm nhận như look, seem, feel, sound, taste, smell, get, become, ta dùng TÍNH TỪ, vì từ đó mô tả chủ ngữ chứ không mô tả hành động.",
        examples: [
          { en: "You look tired.", vi: "Trông bạn có vẻ mệt." },
          { en: "This soup tastes good.", vi: "Món súp này ngon." },
          {
            en: "He looked at me angrily.",
            vi: "Anh ấy nhìn tôi một cách giận dữ.",
            note: "Ở đây look at là hành động “nhìn”, nên dùng trạng từ angrily.",
          },
        ],
      },
      {
        heading: "Trạng từ tần suất và vị trí trong câu",
        table: {
          head: ["Trạng từ", "Mức độ (ước lượng)", "Nghĩa"],
          rows: [
            ["always", "100%", "luôn luôn"],
            ["usually", "khoảng 90%", "thường thường"],
            ["often", "khoảng 70%", "hay, thường xuyên"],
            ["sometimes", "khoảng 50%", "thỉnh thoảng"],
            ["rarely / seldom", "khoảng 10%", "hiếm khi"],
            ["never", "0%", "không bao giờ"],
          ],
        },
        points: [
          "Đứng TRƯỚC động từ thường: I usually get up at six.",
          "Đứng SAU động từ be: She is always late.",
          "Đứng giữa trợ động từ / động từ khuyết thiếu và động từ chính: I have never been to Hue. / You can always call me.",
          "Trong câu phủ định, thường đứng sau don't / doesn't: I don't usually eat breakfast.",
          "never đã mang nghĩa phủ định nên không dùng thêm not: I never drink coffee. (KHÔNG nói: I don't never drink coffee.)",
          "sometimes và usually cũng có thể đứng đầu câu: Sometimes I walk to work.",
          "Hỏi về tần suất dùng How often ...? Các cụm như every day, once a week, twice a month thường đứng cuối câu: I go swimming twice a week.",
        ],
        examples: [
          { en: "I usually get up at six.", vi: "Tôi thường dậy lúc sáu giờ." },
          { en: "She is always late for meetings.", vi: "Cô ấy luôn đi họp muộn." },
          { en: "We sometimes eat out on Sundays.", vi: "Chúng tôi thỉnh thoảng ăn ngoài vào Chủ nhật." },
          { en: "I have never seen snow.", vi: "Tôi chưa bao giờ thấy tuyết." },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "She speaks English very good.",
        right: "She speaks English very well.",
        why: "Từ này bổ nghĩa cho động từ speaks nên phải dùng trạng từ well, không dùng tính từ good.",
      },
      {
        wrong: "He drives very careful.",
        right: "He drives very carefully.",
        why: "Bổ nghĩa cho động từ drives → dùng trạng từ carefully.",
      },
      {
        wrong: "I go always to school by bus.",
        right: "I always go to school by bus.",
        why: "Trạng từ tần suất đứng trước động từ thường.",
      },
      {
        wrong: "She always is late.",
        right: "She is always late.",
        why: "Trạng từ tần suất đứng sau động từ be.",
      },
      {
        wrong: "He works hardly.",
        right: "He works hard.",
        why: "Trạng từ của hard vẫn là hard. hardly nghĩa là “hầu như không”, làm câu sai nghĩa hoàn toàn.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "She sings ___.",
        options: ["beautiful", "beauty", "beautifully"],
        answer: 2,
        explain: "Bổ nghĩa cho động từ sings → trạng từ beautifully. beautiful là tính từ, beauty là danh từ.",
      },
      {
        kind: "choice",
        question: "He is a ___ driver. He has never had an accident.",
        options: ["careful", "carefully", "care"],
        answer: 0,
        explain: "Bổ nghĩa cho danh từ driver → tính từ careful.",
      },
      {
        kind: "choice",
        question: "Chọn câu đúng.",
        options: ["I always am tired after work.", "I am always tired after work.", "Always I am tired after work."],
        answer: 1,
        explain: "Trạng từ tần suất đứng SAU động từ be: I am always tired. always không đứng đầu câu như sometimes.",
      },
      {
        kind: "choice",
        question: "Tom works very ___. He often stays at the office until 9 p.m.",
        options: ["hardly", "harder", "hardy", "hard"],
        answer: 3,
        explain:
          "Trạng từ của hard vẫn là hard (làm việc chăm chỉ). hardly nghĩa là “hầu như không”, trái nghĩa với ngữ cảnh. “very harder” sai.",
      },
      {
        kind: "choice",
        question: "This soup tastes ___.",
        options: ["good", "well", "nicely"],
        answer: 0,
        explain: "Sau động từ cảm nhận taste dùng tính từ (mô tả món súp) → good. well và nicely là trạng từ.",
      },
      {
        kind: "fill",
        question: "Please speak ___. The baby is sleeping.",
        answers: ["quietly", "more quietly"],
        hint: "quiet",
        explain: "Bổ nghĩa cho động từ speak → trạng từ: quiet + ly = quietly.",
      },
      {
        kind: "fill",
        question: "He doesn't speak English very ___.",
        answers: ["well"],
        hint: "good",
        explain: "Trạng từ của good là well (bất quy tắc).",
      },
      {
        kind: "fill",
        question: "I ___ coffee in the evening because it keeps me awake.",
        answers: ["never drink"],
        hint: "never / drink",
        explain: "Trạng từ tần suất đứng trước động từ thường: never drink. Không thêm don't vì never đã mang nghĩa phủ định.",
      },
    ],
  },

  // ───────────────────────────── 7. MODALS: OBLIGATION & ADVICE ─────────────────────────────
  {
    id: "a2-modals-obligation",
    level: "A2",
    title: "Bắt buộc, cấm và lời khuyên: must, have to, should",
    titleEn: "must, have to, should",
    summary:
      "Bài học giúp bạn diễn đạt sự bắt buộc (must, have to), sự cấm đoán (mustn't), việc không cần làm (don't have to) và lời khuyên (should, shouldn't), đặc biệt là phân biệt mustn't và don't have to.",
    sections: [
      {
        heading: "Tổng quan",
        points: [
          "must / have to: phải (bắt buộc).",
          "mustn't: không được (cấm).",
          "don't have to: không cần, không bắt buộc.",
          "should / shouldn't: nên / không nên (lời khuyên).",
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "must / should – khẳng định", pattern: "S + must/should + V" },
          { label: "must / should – phủ định", pattern: "S + mustn't/shouldn't + V" },
          { label: "should – câu hỏi", pattern: "Should + S + V?" },
          { label: "have to – khẳng định", pattern: "S + have/has to + V" },
          { label: "have to – phủ định", pattern: "S + don't/doesn't have to + V" },
          { label: "have to – câu hỏi", pattern: "Do/Does + S + have to + V?" },
          { label: "Quá khứ", pattern: "S + had to + V / S + didn't have to + V" },
        ],
        points: [
          "must và should là động từ khuyết thiếu: không thêm -s, không có to phía sau, không dùng do/does trong câu hỏi và phủ định: He must go (KHÔNG nói: He musts go / He must to go).",
          "have to là động từ thường: chia theo chủ ngữ (has to với he/she/it) và cần do/does/did trong câu hỏi, câu phủ định.",
          "must không có dạng quá khứ. Nói về sự bắt buộc trong quá khứ dùng had to: I had to work late yesterday. Phủ định: didn't have to.",
        ],
      },
      {
        heading: "must và have to: bắt buộc",
        text: "Cả hai đều diễn tả sự bắt buộc và nhiều khi dùng thay nhau được. Tuy nhiên có một khác biệt nhỏ:",
        points: [
          "must: người nói tự thấy cần thiết (ý kiến, cảm nhận của người nói): I must call my mum tonight. Cũng hay dùng trong biển báo, nội quy viết.",
          "have to: bắt buộc do quy định, luật lệ hoặc hoàn cảnh bên ngoài: I have to wear a uniform at work. (Công ty quy định.)",
          "Trong câu hỏi, Do I have to ...? phổ biến hơn Must I ...?",
          "must còn dùng để khuyên mạnh hoặc giới thiệu nhiệt tình: You must try this cake! It's delicious.",
        ],
        examples: [
          { en: "I must call my mum tonight. It's her birthday.", vi: "Tối nay tôi phải gọi cho mẹ. Hôm nay là sinh nhật mẹ." },
          { en: "I have to wear a uniform at work.", vi: "Tôi phải mặc đồng phục ở chỗ làm." },
          { en: "Does she have to work on Saturdays?", vi: "Cô ấy có phải làm việc vào thứ Bảy không?" },
          { en: "We had to wait for two hours.", vi: "Chúng tôi đã phải đợi hai tiếng." },
        ],
      },
      {
        heading: "mustn't và don't have to: nghĩa rất khác nhau!",
        text: "Ở dạng khẳng định, must và have to gần nghĩa nhau; nhưng ở dạng phủ định, nghĩa của chúng hoàn toàn khác.",
        table: {
          head: ["Cấu trúc", "Nghĩa", "Ví dụ"],
          rows: [
            ["mustn't + V", "Cấm, không được làm", "You mustn't park here. (Không được đỗ xe ở đây.)"],
            [
              "don't / doesn't have to + V",
              "Không cần, không bắt buộc (muốn thì làm)",
              "You don't have to come. (Bạn không cần đến đâu.)",
            ],
          ],
        },
        examples: [
          { en: "You mustn't use your phone during the exam.", vi: "Bạn không được dùng điện thoại trong giờ thi." },
          {
            en: "Tomorrow is Sunday, so I don't have to get up early.",
            vi: "Mai là Chủ nhật nên tôi không phải dậy sớm.",
          },
        ],
      },
      {
        heading: "should / shouldn't: lời khuyên",
        text: "should = nên; shouldn't = không nên. Dùng để khuyên hoặc nói về điều đúng đắn nên làm; nhẹ hơn must và have to rất nhiều.",
        points: [
          "Hay đi với I think / I don't think: I think you should see a doctor. / I don't think you should go out tonight.",
          "Xin lời khuyên: Should I ...? / What should I do?",
          "ought to có nghĩa giống should (You ought to rest), nhưng ít dùng hơn, đặc biệt là trong câu hỏi và câu phủ định.",
        ],
        examples: [
          { en: "You look tired. You should go to bed early.", vi: "Trông bạn mệt quá. Bạn nên đi ngủ sớm." },
          { en: "You shouldn't eat so much fast food.", vi: "Bạn không nên ăn nhiều đồ ăn nhanh như vậy." },
          { en: "What should I wear to the party?", vi: "Tôi nên mặc gì đến bữa tiệc?" },
        ],
      },
      {
        heading: "Bảng tổng hợp",
        table: {
          head: ["Cấu trúc", "Nghĩa", "Mức độ"],
          rows: [
            ["must", "phải (người nói thấy cần)", "Mạnh"],
            ["have to", "phải (do quy định, hoàn cảnh)", "Mạnh"],
            ["mustn't", "không được, cấm", "Mạnh"],
            ["don't have to", "không cần, không bắt buộc", "Không bắt buộc"],
            ["should", "nên", "Nhẹ (lời khuyên)"],
            ["shouldn't", "không nên", "Nhẹ (lời khuyên)"],
            ["had to / didn't have to", "đã phải / đã không cần", "Dùng cho quá khứ"],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "You must to wear a helmet.",
        right: "You must wear a helmet.",
        why: "Sau must (và should) là động từ nguyên mẫu không có to.",
      },
      {
        wrong: "He have to work on Sundays.",
        right: "He has to work on Sundays.",
        why: "have to là động từ thường, phải chia theo chủ ngữ: he/she/it → has to.",
      },
      {
        wrong: "You mustn't come tomorrow. It's a holiday.",
        right: "You don't have to come tomorrow. It's a holiday.",
        why: "Ý muốn nói là “không cần đến”, nên dùng don't have to. mustn't có nghĩa là “cấm đến”.",
      },
      {
        wrong: "I must finish the report yesterday.",
        right: "I had to finish the report yesterday.",
        why: "must không có dạng quá khứ; nói về sự bắt buộc trong quá khứ dùng had to.",
      },
      {
        wrong: "Do I should call her?",
        right: "Should I call her?",
        why: "should là động từ khuyết thiếu, tự đảo lên đầu câu khi hỏi, không dùng do/does.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "You ___ smoke in the hospital. It's not allowed.",
        options: ["don't have to", "shouldn't to", "mustn't", "have to"],
        answer: 2,
        explain:
          "“It's not allowed” → cấm → mustn't. don't have to chỉ có nghĩa là không cần; “shouldn't to” sai vì sau should không có to.",
      },
      {
        kind: "choice",
        question: "Tomorrow is Sunday, so I ___ get up early.",
        options: ["mustn't", "must", "has to", "don't have to"],
        answer: 3,
        explain:
          "Chủ nhật được nghỉ nên không cần dậy sớm → don't have to. mustn't nghĩa là bị cấm dậy sớm – sai nghĩa; “I has to” sai chia động từ.",
      },
      {
        kind: "choice",
        question: "You look tired. You ___ go to bed early.",
        options: ["should", "mustn't", "don't have to"],
        answer: 0,
        explain: "Đây là lời khuyên → should. mustn't và don't have to đều không hợp nghĩa.",
      },
      {
        kind: "choice",
        question: "She ___ wear a uniform at work.",
        options: ["must to", "haves to", "have to", "has to"],
        answer: 3,
        explain: "Chủ ngữ She → has to. “must to” sai vì sau must không có to; “haves” không tồn tại.",
      },
      {
        kind: "choice",
        question: "Yesterday I ___ stay late at the office.",
        options: ["must", "had to", "have to", "musted"],
        answer: 1,
        explain: "“Yesterday” → quá khứ. must không có dạng quá khứ nên dùng had to.",
      },
      {
        kind: "fill",
        question: "You ___ eat so much sugar. It's bad for your teeth.",
        answers: ["shouldn't", "should not"],
        hint: "should / shouldn't",
        explain: "Lời khuyên không nên làm gì (vì có hại cho răng) → shouldn't + V.",
      },
      {
        kind: "fill",
        question: "My brother ___ to get up at 5 a.m. every day. He hates it.",
        answers: ["has"],
        hint: "have",
        explain: "have to chia theo chủ ngữ ở hiện tại (He hates it): My brother (he) → has to.",
      },
      {
        kind: "fill",
        question: "When I was a child, I ___ help my parents on the farm.",
        answers: ["had to"],
        hint: "have to",
        explain: "“When I was a child” → quá khứ. Quá khứ của have to là had to.",
      },
    ],
  },

  // ───────────────────────────── 8. VERB PATTERNS ─────────────────────────────
  {
    id: "a2-verb-patterns",
    level: "A2",
    title: "Động từ + V-ing và động từ + to V",
    titleEn: "Verb patterns: -ing and to-infinitive",
    summary:
      "Khi hai động từ đi liền nhau, động từ thứ hai có thể ở dạng V-ing hoặc to V tùy động từ đứng trước. Bài học tổng hợp các nhóm động từ thông dụng, nhóm dùng được cả hai, would like + to V và quy tắc giới từ + V-ing.",
    sections: [
      {
        heading: "Hai động từ đi liền nhau",
        text: "Khi một động từ theo sau bởi một động từ khác, động từ thứ hai có dạng V-ing hoặc to V. Dạng nào là do động từ đứng trước quyết định; không có quy tắc chung, nên cần học theo nhóm.",
        examples: [
          { en: "I enjoy cooking.", vi: "Tôi thích nấu ăn.", note: "enjoy + V-ing" },
          { en: "I want to cook tonight.", vi: "Tối nay tôi muốn nấu ăn.", note: "want + to V" },
        ],
      },
      {
        heading: "Động từ + V-ing",
        table: {
          head: ["Động từ", "Nghĩa", "Ví dụ"],
          rows: [
            ["enjoy", "thích, tận hưởng", "I enjoy reading."],
            ["finish", "làm xong", "Have you finished eating?"],
            ["mind", "phiền, ngại (thường trong câu hỏi, phủ định)", "I don't mind waiting."],
            ["avoid", "tránh", "Try to avoid eating late at night."],
            ["keep", "cứ, liên tục", "He keeps calling me."],
            ["practise (Mỹ: practice)", "luyện tập", "I practise speaking English every day."],
            ["stop", "ngừng", "Please stop talking."],
            ["suggest", "gợi ý, đề xuất", "She suggested going to the beach."],
            ["give up", "từ bỏ", "My dad gave up smoking."],
          ],
        },
        points: [
          "Would you mind + V-ing ...? là cách nhờ vả lịch sự: Would you mind opening the window? (Bạn có phiền mở cửa sổ giúp tôi không?)",
          "stop + to V mang nghĩa khác: dừng việc đang làm để làm một việc khác. He stopped to buy some water. (Anh ấy dừng lại để mua nước.)",
        ],
        examples: [
          { en: "My dad gave up smoking last year.", vi: "Năm ngoái bố tôi đã bỏ thuốc lá." },
          { en: "Would you mind opening the window?", vi: "Bạn có phiền mở cửa sổ giúp tôi không?" },
        ],
      },
      {
        heading: "Động từ + to V",
        table: {
          head: ["Động từ", "Nghĩa", "Ví dụ"],
          rows: [
            ["want", "muốn", "I want to go home."],
            ["need", "cần", "You need to sleep more."],
            ["decide", "quyết định", "We decided to stay at home."],
            ["hope", "hy vọng", "I hope to see you soon."],
            ["plan", "dự định, lên kế hoạch", "They plan to get married next year."],
            ["learn", "học (cách làm gì)", "She's learning to drive."],
            ["promise", "hứa", "He promised to help me."],
            ["agree / refuse", "đồng ý / từ chối", "She refused to answer."],
            ["would like / would love", "muốn (lịch sự) / rất muốn", "I'd like to order now."],
          ],
        },
        points: ["Dạng phủ định chuẩn là not + to V: I decided not to go."],
        examples: [
          { en: "We decided to stay at home.", vi: "Chúng tôi quyết định ở nhà." },
          { en: "He promised not to be late again.", vi: "Anh ấy hứa sẽ không đến muộn nữa." },
        ],
      },
      {
        heading: "like / love / hate / start / begin: dùng được cả hai",
        points: [
          "like, love, hate, prefer, start, begin + V-ing hoặc to V, nghĩa gần như không đổi: I like swimming = I like to swim. It started raining = It started to rain.",
          "NHƯNG would like / would love / would prefer luôn đi với to V: I'd like to swim.",
          "like + V-ing / to V: nói về sở thích nói chung. would like + to V: muốn làm gì vào một dịp cụ thể (lịch sự hơn want).",
        ],
        table: {
          head: ["Câu", "Nghĩa"],
          rows: [
            ["I like dancing. / I like to dance.", "Tôi thích nhảy (sở thích nói chung)."],
            ["I'd like to dance.", "Tôi muốn nhảy (bây giờ, vào lúc này)."],
          ],
        },
        examples: [
          { en: "She loves cooking for her family.", vi: "Cô ấy rất thích nấu ăn cho gia đình." },
          { en: "It started to rain at 5 o'clock.", vi: "Trời bắt đầu mưa lúc 5 giờ." },
          { en: "Would you like to come with us?", vi: "Bạn có muốn đi cùng chúng tôi không?" },
        ],
      },
      {
        heading: "Giới từ + V-ing",
        text: "Sau giới từ (in, at, of, about, for, before, after, without...), động từ luôn ở dạng V-ing.",
        points: [
          "interested in: I'm interested in learning Korean.",
          "good at / bad at: She's good at drawing.",
          "afraid of / tired of: He's afraid of flying.",
          "thank you for: Thank you for helping me.",
          "How about / What about ...? (gợi ý): How about going to the cinema?",
          "before / after: Wash your hands before eating.",
          "look forward to (mong chờ): to ở đây là giới từ, nên theo sau là V-ing: I'm looking forward to seeing you.",
        ],
        examples: [
          { en: "I'm interested in learning Korean.", vi: "Tôi thích học tiếng Hàn." },
          { en: "Thank you for helping me.", vi: "Cảm ơn bạn đã giúp tôi." },
          { en: "How about going to the cinema tonight?", vi: "Tối nay mình đi xem phim nhé?" },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "I enjoy to listen to music.",
        right: "I enjoy listening to music.",
        why: "enjoy luôn đi với V-ing.",
      },
      {
        wrong: "I want going home.",
        right: "I want to go home.",
        why: "want luôn đi với to V.",
      },
      {
        wrong: "I would like going to the beach this weekend.",
        right: "I would like to go to the beach this weekend.",
        why: "would like luôn đi với to V (khác với like có thể đi với V-ing).",
      },
      {
        wrong: "She is good at cook.",
        right: "She is good at cooking.",
        why: "Sau giới từ at phải dùng V-ing.",
      },
      {
        wrong: "I look forward to see you.",
        right: "I look forward to seeing you.",
        why: "to trong look forward to là giới từ, nên sau nó dùng V-ing.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "I enjoy ___ films at home.",
        options: ["watch", "to watch", "watching"],
        answer: 2,
        explain: "enjoy + V-ing → watching.",
      },
      {
        kind: "choice",
        question: "We decided ___ a taxi because it was raining.",
        options: ["taking", "to take", "take", "took"],
        answer: 1,
        explain: "decide + to V → to take.",
      },
      {
        kind: "choice",
        question: "Would you like ___ some tea?",
        options: ["to have", "having", "have"],
        answer: 0,
        explain: "would like luôn đi với to V → to have. Không nhầm với like + V-ing.",
      },
      {
        kind: "choice",
        question: "Thank you for ___ me with my homework.",
        options: ["helping", "help", "to help", "helped"],
        answer: 0,
        explain: "for là giới từ → sau giới từ dùng V-ing: helping.",
      },
      {
        kind: "choice",
        question: "Would you mind ___ the window? It's cold.",
        options: ["to close", "close", "closed", "closing"],
        answer: 3,
        explain: "mind + V-ing → Would you mind closing ...? là cách nhờ vả lịch sự.",
      },
      {
        kind: "fill",
        question: "I hope ___ you again soon.",
        answers: ["to see"],
        hint: "see",
        explain: "hope + to V → to see.",
      },
      {
        kind: "fill",
        question: "He has finished ___ the report.",
        answers: ["writing"],
        hint: "write",
        explain: "finish + V-ing. Chính tả: write bỏ e rồi thêm -ing → writing.",
      },
      {
        kind: "fill",
        question: "My sister is afraid of ___ alone at night.",
        answers: ["walking"],
        hint: "walk",
        explain: "of là giới từ → sau giới từ dùng V-ing: walking.",
      },
    ],
  },

  // ───────────────────────────── 9. QUANTIFIERS ─────────────────────────────
  {
    id: "a2-quantifiers",
    level: "A2",
    title: "Từ chỉ số lượng: a lot of, a few, a little, too, enough",
    titleEn: "Quantifiers: a lot of, (a) few, (a) little, too, enough",
    summary:
      "Bài học giúp bạn nói về số lượng nhiều/ít đúng cách với danh từ đếm được và không đếm được: a lot of / lots of, a few / few, a little / little, too / too much / too many và enough (cùng vị trí của enough).",
    sections: [
      {
        heading: "Nhắc lại: danh từ đếm được và không đếm được",
        points: [
          "Danh từ đếm được có dạng số ít và số nhiều: a book – two books, a friend – friends.",
          "Danh từ không đếm được không có số nhiều, không dùng a/an: water, milk, money, time, information, advice, homework.",
          "Mỗi từ chỉ lượng dưới đây chỉ đi với một loại danh từ hoặc đi với cả hai; cần nhớ để chọn cho đúng.",
        ],
      },
      {
        heading: "a lot of / lots of (và many / much)",
        points: [
          "a lot of / lots of = nhiều, dùng được với cả danh từ đếm được số nhiều và danh từ không đếm được, hay dùng trong câu khẳng định. lots of thân mật hơn một chút.",
          "many + danh từ đếm được số nhiều; much + danh từ không đếm được. Hai từ này hay dùng trong câu phủ định và câu hỏi: There aren't many people. / Do you have much time?",
          "Trong câu khẳng định, much nghe khá trang trọng; thường dùng a lot of thay thế: I drink a lot of water.",
          "a lot (không có of) đứng cuối câu, sau động từ: I like it a lot. / She travels a lot.",
        ],
        examples: [
          { en: "There are a lot of people in the park today.", vi: "Hôm nay có rất nhiều người trong công viên." },
          { en: "She drinks lots of water every day.", vi: "Cô ấy uống rất nhiều nước mỗi ngày." },
          { en: "We don't have much time.", vi: "Chúng ta không có nhiều thời gian." },
          { en: "How many brothers and sisters do you have?", vi: "Bạn có bao nhiêu anh chị em?" },
        ],
      },
      {
        heading: "a few / few, a little / little",
        table: {
          head: ["Từ", "Đi với", "Nghĩa", "Ví dụ"],
          rows: [
            [
              "a few",
              "danh từ đếm được số nhiều",
              "một vài (đủ dùng, ý tích cực)",
              "I have a few friends here. (Tôi có vài người bạn ở đây.)",
            ],
            [
              "few",
              "danh từ đếm được số nhiều",
              "rất ít, hầu như không (ý tiêu cực)",
              "He has few friends. (Anh ấy hầu như không có bạn.)",
            ],
            [
              "a little",
              "danh từ không đếm được",
              "một ít (đủ dùng, ý tích cực)",
              "There's a little milk left. (Vẫn còn một ít sữa.)",
            ],
            [
              "little",
              "danh từ không đếm được",
              "rất ít, hầu như không (ý tiêu cực)",
              "We have little time. (Chúng ta có rất ít thời gian.)",
            ],
          ],
        },
        points: [
          "few và little (không có a) hơi trang trọng; trong văn nói người ta hay dùng not many / not much / very few / very little: He doesn't have many friends.",
          "a little còn có thể đứng trước tính từ, nghĩa là “hơi, một chút”: I'm a little tired.",
        ],
        examples: [
          { en: "Can I ask you a few questions?", vi: "Tôi hỏi bạn vài câu được không?" },
          { en: "There's a little rice left. Do you want some?", vi: "Còn một ít cơm. Bạn có muốn ăn không?" },
        ],
      },
      {
        heading: "too / too much / too many",
        text: "too nghĩa là “quá”, mang ý tiêu cực: nhiều hơn mức cần thiết hoặc mức chấp nhận được.",
        formulas: [
          { label: "too + tính từ / trạng từ", pattern: "too + adj/adv (too hot, too fast)" },
          { label: "too much + danh từ không đếm được", pattern: "too much + N (too much sugar)" },
          { label: "too many + danh từ đếm được số nhiều", pattern: "too many + N-s (too many cars)" },
          { label: "too ... to V", pattern: "too + adj + (for sb) + to V" },
        ],
        points: [
          "too much có thể đứng sau động từ: He talks too much.",
          "Phân biệt too và very: very chỉ nhấn mạnh, không mang ý “không làm được”. This bag is very heavy, but I can carry it. / This bag is too heavy. I can't carry it.",
        ],
        examples: [
          { en: "This coffee is too hot to drink.", vi: "Cà phê này nóng quá, không uống được." },
          { en: "There are too many cars on the road.", vi: "Có quá nhiều xe trên đường." },
          { en: "You spend too much money on clothes.", vi: "Bạn tiêu quá nhiều tiền vào quần áo." },
        ],
      },
      {
        heading: "enough và vị trí của enough",
        text: "enough = đủ. Vị trí của enough phụ thuộc vào từ đi cùng: đứng SAU tính từ/trạng từ nhưng đứng TRƯỚC danh từ.",
        formulas: [
          { label: "Tính từ / trạng từ + enough", pattern: "adj/adv + enough (old enough, fast enough)" },
          { label: "enough + danh từ", pattern: "enough + N (enough money, enough chairs)" },
          { label: "Thêm mục đích", pattern: "adj + enough + (for sb) + to V" },
        ],
        points: [
          "old enough (KHÔNG nói: enough old); enough money (cách nói money enough đã cũ, không nên dùng).",
        ],
        examples: [
          { en: "She's old enough to drive.", vi: "Cô ấy đủ tuổi lái xe." },
          { en: "We don't have enough chairs for everyone.", vi: "Chúng ta không có đủ ghế cho mọi người." },
          { en: "He didn't run fast enough to win the race.", vi: "Anh ấy chạy không đủ nhanh để thắng cuộc đua." },
        ],
      },
      {
        heading: "Bảng tổng hợp",
        table: {
          head: ["Từ", "Danh từ đếm được (số nhiều)", "Danh từ không đếm được"],
          rows: [
            ["a lot of / lots of", "Có: a lot of books", "Có: a lot of money"],
            ["many", "Có: many books", "Không"],
            ["much", "Không", "Có: much money"],
            ["a few / few", "Có: a few books", "Không"],
            ["a little / little", "Không", "Có: a little money"],
            ["too many / too much", "too many books", "too much money"],
            ["enough", "Có: enough books", "Có: enough money"],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "There are too much cars in the city.",
        right: "There are too many cars in the city.",
        why: "cars là danh từ đếm được số nhiều → too many.",
      },
      {
        wrong: "I have a few money.",
        right: "I have a little money.",
        why: "money là danh từ không đếm được → a little.",
      },
      {
        wrong: "She isn't enough old to drive.",
        right: "She isn't old enough to drive.",
        why: "enough đứng SAU tính từ.",
      },
      {
        wrong: "This coffee is very hot to drink.",
        right: "This coffee is too hot to drink.",
        why: "Ý “quá ... đến mức không làm được” dùng too ... to V; very không dùng trong cấu trúc này.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "There isn't ___ milk in the fridge.",
        options: ["many", "much", "a few"],
        answer: 1,
        explain: "milk là danh từ không đếm được, câu phủ định → much. many và a few chỉ đi với danh từ đếm được.",
      },
      {
        kind: "choice",
        question: "I have ___ friends in Da Nang, so I'm never lonely there.",
        options: ["few", "a little", "a few", "little"],
        answer: 2,
        explain:
          "friends là danh từ đếm được số nhiều; ý tích cực (không bao giờ cô đơn) → a few. few mang nghĩa “hầu như không có”, mâu thuẫn với ngữ cảnh.",
      },
      {
        kind: "choice",
        question: "He's only 15. He isn't ___ to drive a car.",
        options: ["old enough", "enough old", "enough", "old too"],
        answer: 0,
        explain: "enough đứng sau tính từ: old enough. “enough old” sai vị trí.",
      },
      {
        kind: "choice",
        question: "There are ___ people here. Let's go somewhere quieter.",
        options: ["too", "too much", "enough", "too many"],
        answer: 3,
        explain: "people là danh từ đếm được số nhiều; ý “quá đông” → too many. too much dùng cho danh từ không đếm được.",
      },
      {
        kind: "choice",
        question: "Hurry up! We have very ___ time.",
        options: ["few", "little", "a few", "many"],
        answer: 1,
        explain: "time là danh từ không đếm được; ý tiêu cực (phải nhanh lên) → very little. few, a few, many dùng cho danh từ đếm được.",
      },
      {
        kind: "fill",
        question: "You eat ___ sugar. It's bad for your health.",
        answers: ["too much"],
        hint: "too much / too many",
        explain: "sugar là danh từ không đếm được → too much.",
      },
      {
        kind: "fill",
        question: "This room isn't ___ for 30 people. We need a bigger one.",
        answers: ["big enough"],
        hint: "big / enough",
        explain: "enough đứng sau tính từ → big enough.",
      },
      {
        kind: "fill",
        question: "Could I have ___ water, please? Just a bit.",
        answers: ["a little"],
        hint: "a little / a few",
        explain: "water là danh từ không đếm được, nghĩa “một ít” → a little.",
      },
    ],
  },

  // ───────────────────────────── 10. CONJUNCTIONS ─────────────────────────────
  {
    id: "a2-conjunctions",
    level: "A2",
    title: "Liên từ: and, but, or, so, because và liên từ thời gian",
    titleEn: "Conjunctions and time clauses",
    summary:
      "Bài học giúp bạn nối câu bằng and, but, or, so, because, và dùng các liên từ thời gian when, before, after, until, as soon as – đặc biệt là quy tắc không dùng will sau liên từ thời gian.",
    sections: [
      {
        heading: "Liên từ là gì?",
        text: "Liên từ dùng để nối hai từ, hai cụm từ hoặc hai mệnh đề với nhau. Năm liên từ cơ bản:",
        table: {
          head: ["Liên từ", "Nghĩa / chức năng", "Ví dụ"],
          rows: [
            ["and", "và (thêm thông tin)", "I like tea and coffee."],
            ["but", "nhưng (đối lập)", "It's small but comfortable."],
            ["or", "hoặc (lựa chọn)", "Would you like tea or coffee?"],
            ["so", "vì vậy, nên (kết quả)", "It was late, so we took a taxi."],
            ["because", "vì, bởi vì (lý do)", "We took a taxi because it was late."],
          ],
        },
      },
      {
        heading: "and, but, or",
        points: [
          "and nối các ý cùng chiều: I got up and had a shower.",
          "but nối hai ý trái ngược: I'm tired, but I'm happy.",
          "or dùng cho lựa chọn; trong câu phủ định, or thay cho and: I don't like tea or coffee. (Tôi không thích cả trà lẫn cà phê.)",
          "Khi nối hai mệnh đề, thường có dấu phẩy trước but và so.",
        ],
        examples: [
          { en: "I called her, but she didn't answer.", vi: "Tôi gọi cho cô ấy nhưng cô ấy không nghe máy." },
          { en: "You can pay by card or in cash.", vi: "Bạn có thể trả bằng thẻ hoặc tiền mặt." },
        ],
      },
      {
        heading: "so và because",
        text: "because giới thiệu NGUYÊN NHÂN, so giới thiệu KẾT QUẢ. Cùng một tình huống có thể diễn đạt bằng cả hai cách.",
        formulas: [
          { label: "so", pattern: "Nguyên nhân, so + kết quả" },
          { label: "because", pattern: "Kết quả + because + nguyên nhân" },
        ],
        points: [
          "because có thể đứng đầu câu (đặt dấu phẩy sau mệnh đề đó): Because it was raining, we stayed at home.",
          "KHÔNG dùng because và so trong cùng một câu (lỗi do dịch “vì ... nên ...” từ tiếng Việt).",
          "because + mệnh đề (có chủ ngữ và động từ); because of + danh từ: because of the rain.",
        ],
        examples: [
          { en: "It was raining, so we stayed at home.", vi: "Trời mưa nên chúng tôi ở nhà." },
          { en: "We stayed at home because it was raining.", vi: "Chúng tôi ở nhà vì trời mưa." },
          { en: "I didn't go out because I was tired.", vi: "Tôi không ra ngoài vì tôi mệt." },
        ],
      },
      {
        heading: "Liên từ thời gian: when, before, after, until, as soon as",
        table: {
          head: ["Liên từ", "Nghĩa", "Ví dụ"],
          rows: [
            ["when", "khi", "When I was young, I lived in the countryside."],
            ["before", "trước khi", "Turn off the lights before you go out."],
            ["after", "sau khi", "After she finished work, she went to the gym."],
            ["until (till)", "cho đến khi", "Wait here until I come back."],
            ["as soon as", "ngay khi", "Call me as soon as you arrive."],
          ],
        },
        points: [
          "Mệnh đề thời gian có thể đứng trước hoặc sau mệnh đề chính. Nếu đứng trước, đặt dấu phẩy sau nó: When I got home, I had dinner. / I had dinner when I got home.",
          "until dùng cho hành động kéo dài đến một thời điểm: I'll stay here until 6 o'clock.",
        ],
        examples: [
          { en: "After she finished work, she went to the gym.", vi: "Sau khi làm xong việc, cô ấy đi tập gym." },
          { en: "Turn off the lights before you go out.", vi: "Tắt đèn trước khi ra ngoài nhé." },
        ],
      },
      {
        heading: "Không dùng will sau liên từ thời gian",
        text: "Khi nói về tương lai, trong mệnh đề bắt đầu bằng when, before, after, until, as soon as (và cả if), ta dùng thì HIỆN TẠI ĐƠN, không dùng will. Mệnh đề chính vẫn dùng will hoặc câu mệnh lệnh.",
        formulas: [
          {
            label: "Tương lai với liên từ thời gian",
            pattern: "S + will + V + when/before/after/until/as soon as + S + V(s/es)",
          },
        ],
        points: [
          "I'll call you when I arrive. (KHÔNG nói: when I will arrive.)",
          "Có thể dùng hiện tại hoàn thành để nhấn mạnh việc đã làm xong: I'll call you when I've finished my work.",
        ],
        examples: [
          { en: "I'll call you when I arrive.", vi: "Khi nào đến nơi, tôi sẽ gọi cho bạn." },
          {
            en: "As soon as I get home, I'll send you the photos.",
            vi: "Ngay khi về đến nhà, tôi sẽ gửi ảnh cho bạn.",
          },
          { en: "We'll wait until the rain stops.", vi: "Chúng ta sẽ đợi đến khi tạnh mưa." },
          { en: "Before you leave, please close the windows.", vi: "Trước khi về, làm ơn đóng cửa sổ." },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "Because it was raining, so we stayed at home.",
        right: "Because it was raining, we stayed at home.",
        why: "Không dùng because và so trong cùng một câu. Có thể nói: It was raining, so we stayed at home.",
      },
      {
        wrong: "I'll call you when I will arrive.",
        right: "I'll call you when I arrive.",
        why: "Sau liên từ thời gian (when, as soon as, until...) dùng hiện tại đơn để nói về tương lai, không dùng will.",
      },
      {
        wrong: "I was tired, but I went to bed early.",
        right: "I was tired, so I went to bed early.",
        why: "Đi ngủ sớm là KẾT QUẢ của việc mệt, nên dùng so; but dùng cho hai ý trái ngược.",
      },
      {
        wrong: "I didn't go to school because of I was sick.",
        right: "I didn't go to school because I was sick.",
        why: "Trước một mệnh đề (I was sick) dùng because; because of chỉ đi với danh từ (because of the rain).",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "I was hungry, ___ I made a sandwich.",
        options: ["because", "but", "so", "or"],
        answer: 2,
        explain: "Làm bánh mì kẹp là KẾT QUẢ của việc đói → so. because đứng trước nguyên nhân, không đứng trước kết quả.",
      },
      {
        kind: "choice",
        question: "Would you like tea ___ coffee?",
        options: ["or", "so", "because"],
        answer: 0,
        explain: "Hỏi để người nghe chọn một trong hai → or.",
      },
      {
        kind: "choice",
        question: "I'll phone you as soon as I ___ at the airport.",
        options: ["will arrive", "arrive", "arrived", "arriving"],
        answer: 1,
        explain:
          "Sau as soon as, khi nói về tương lai, dùng hiện tại đơn (arrive), không dùng will. arrived là quá khứ, không hợp với I'll phone.",
      },
      {
        kind: "choice",
        question: "She stayed at home ___ she was ill.",
        options: ["so", "or", "but", "because"],
        answer: 3,
        explain: "“she was ill” là NGUYÊN NHÂN của việc ở nhà → because.",
      },
      {
        kind: "choice",
        question: "Please wait here ___ I come back.",
        options: ["because", "until", "so", "or"],
        answer: 1,
        explain: "Đợi kéo dài đến thời điểm tôi quay lại → until (cho đến khi).",
      },
      {
        kind: "fill",
        question: "When I ___ home tonight, I'll cook dinner.",
        answers: ["get"],
        hint: "get",
        explain: "Sau when, khi nói về tương lai, dùng hiện tại đơn: When I get home (KHÔNG nói: When I will get home).",
      },
      {
        kind: "fill",
        question: "I like coffee, ___ my sister doesn't.",
        answers: ["but"],
        hint: "and / but / so",
        explain: "Hai ý trái ngược (tôi thích – em gái không thích) → but.",
      },
      {
        kind: "fill",
        question: "We'll start the meeting after everyone ___.",
        answers: ["arrives", "has arrived"],
        hint: "arrive",
        explain:
          "Sau after, khi nói về tương lai, dùng hiện tại đơn; everyone là chủ ngữ số ít → arrives (has arrived cũng đúng, nhấn mạnh việc đã đến đủ).",
      },
    ],
  },
];
