# TV-English

A playful vocabulary learning app built with Next.js and Supabase, starring a crew of curious soot sprites.

## Features

- **Email accounts:** sign up, log in, forgot password and password reset with Supabase Auth.
- **Animated login screen:** soot sprites peek over the card, watch you type, pull out binoculars and magnifiers while you enter a password, hold up signs when something is wrong, and celebrate with confetti when you sign in.
- **Vocabulary library:** add, edit, delete and favorite words; search and filter by deck and mastery level.
- **AI suggestions:** Gemini fills in meaning, pronunciation, examples and related words.
- **CSV / Excel import:** templates are in `public/templates/`.
- **Decks:** group words by topic, exam or goal.
- **Flashcards:** spaced repetition with Again / Hard / Good / Easy ratings. The soot crew reacts to each rating.
- **Games:** Quick Quiz, Type It, Listen & Type, Match Pairs and Speed Round, with XP, combos and crew reactions.
- **Progress:** XP levels, daily goal, streaks, achievements and learning statistics.
- **Pronunciation:** uses the browser's Speech Synthesis.
- **Realtime sync** across devices.
- **Light / dark mode** and a responsive desktop + mobile UI.

## 1. Supabase setup

1. Go to **Authentication → Sign In / Providers** and enable **Email**.
   - While developing, you can turn off **Confirm email** to avoid email rate limits.
   - Enabling **Anonymous** is only needed if you still have old guest data to migrate into accounts.
2. Go to **Authentication → URL Configuration** and add your site URL (for example `http://localhost:3000` and your production domain) to the redirect URLs. Email confirmation and password reset links redirect back to it.
3. In the **SQL Editor**, run:
   - `supabase/schema.sql`: decks, vocabularies, review history.
   - `supabase/gamification.sql`: XP, streaks and the `record_learning_activity` function.
4. Under **Database → Replication**, enable Realtime for `decks`, `vocabularies` and `user_progress` so changes sync live.

## 2. Environment variables

Create `.env.local`. You can copy it from `.env.example`.

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

- `GEMINI_API_KEY` is only used by the server route `app/api/vocabulary/generate`. Never expose it through a `NEXT_PUBLIC_*` variable.
- Do not commit `.env.local`.

## 3. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 4. Deploy on Vercel

1. Push the project to GitHub.
2. In Vercel, go to **Add New → Project** and import the repository.
3. Add the three environment variables above.
4. Deploy, then add the production URL to the Supabase redirect URLs.

The browser uses the Supabase publishable key, so Row Level Security must stay enabled. Never put a Supabase secret or `service_role` key in a `NEXT_PUBLIC_*` variable.

## Project structure

| Path | What it does |
| --- | --- |
| `components/VocabApp.tsx` | App shell, data loading, realtime sync, dashboard, vocabulary, decks and stats views |
| `components/AuthScreen.tsx` | Login, register, forgot password, password reset and guest migration |
| `components/AuthMascots.tsx` | Login-screen soot sprites: eye tracking, spy tools, error signs, confetti |
| `components/Soot.tsx` | Shared soot sprite drawing plus `PeekCrew`, `SootBuddy`, `SootBackdrop` and `useSootEyes` |
| `components/Logo.tsx` | TV-English logo (`LogoMark`, `Logo`) |
| `components/FlashcardStudy.tsx` | Flashcard session |
| `components/GamesView.tsx` | Games and achievements |
| `components/WordModal.tsx`, `ImportWordsModal.tsx`, `DeckModal.tsx` | Add / edit word, import and new deck dialogs |
| `lib/` | Supabase client, spaced repetition, gamification, speech and shared types |
| `app/globals.css` | All styles, including mascot animations |

## Customizing the soot sprites

- **Accessories:** each sprite takes a `look` with an optional straw hat (`hat`), a flower on the head (`bloom`) and items in each hand (`holdL` / `holdR`).
- **Spy tools:** a sprite can carry a `tool`: `"binoculars"`, `"magnifier"` or `"spyglass"`.
- **Login screen:** sprites are configured in the `SPRITES` array in `components/AuthMascots.tsx`. Error sign texts are in `errorSign` in `components/AuthScreen.tsx`.
- **Other pages:** wrap any card in `<PeekCrew members={...}>` to add a crew peeking over it.
- **Reduced motion:** all mascot animations respect the system's reduced-motion setting.
