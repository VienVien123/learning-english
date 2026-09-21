LEXIBLOOM - CSV / EXCEL IMPORT PATCH

Copy/replace these files into your existing project:
- components/ImportWordsModal.tsx     (new)
- components/VocabApp.tsx             (replace)
- app/globals.css                      (replace)
- package.json                         (replace)
- public/templates/vocabulary-import-template.xlsx (new)
- public/templates/vocabulary-import-template.csv  (new)

Then run:
  npm install
  npm run dev

No Supabase SQL migration is required for this feature.

Template required columns:
  word, meaning

Optional columns:
  pronunciation, part_of_speech, example, example_translation, note,
  synonyms, antonyms, tags, favorite

For synonyms / antonyms / tags, separate multiple values with |.
Example: leave|quit|depart
