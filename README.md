# LexiBloom Vocabulary

A beautiful realtime vocabulary learning app built with Next.js + Supabase.

## Features

- Anonymous Supabase authentication (no signup required)
- Realtime vocabulary and deck synchronization
- Add / edit / delete vocabulary
- Gemini suggestions for meaning, pronunciation, examples and related words
- Deck organization
- Search + filters
- Pronunciation via browser Speech Synthesis
- Flashcards with reveal interaction
- Again / Hard / Good / Easy spaced-review scheduling
- Mastery levels and learning statistics
- Favorites
- Responsive desktop + mobile UI
- Light / dark mode

## 1. Supabase setup

In Supabase:

1. Authentication -> Sign In / Providers -> enable **Anonymous**.
2. SQL Editor -> run `supabase/schema.sql` if the tables are not already created.
3. Confirm these tables exist: `decks`, `vocabularies`, `review_history`.

## 2. Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

`GEMINI_API_KEY` is used only by the server route that generates vocabulary suggestions. Keep it out of `NEXT_PUBLIC_*` variables and do not commit `.env.local`.
Copy the key into `GEMINI_API_KEY` in `.env.local`, then restart the dev server to enable automatic suggestions.

## 3. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 4. Deploy free on Vercel

1. Push this project to GitHub.
2. Go to Vercel -> Add New -> Project.
3. Import the GitHub repository.
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `GEMINI_API_KEY`
5. Deploy.

Because this app uses a Supabase publishable key in the browser, Row Level Security is essential. Never put a Supabase secret key or `service_role` key in a `NEXT_PUBLIC_*` variable.

## Notes

Anonymous users are tied to the browser session. Clearing browser storage or changing device can create a new anonymous user. A future version can add Google / email account linking to keep the same vocabulary across devices.
