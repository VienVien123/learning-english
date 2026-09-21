export type Deck = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  icon: string;
  color: string;
  created_at: string;
  updated_at: string;
};

export type Vocabulary = {
  id: string;
  user_id: string;
  deck_id: string | null;
  word: string;
  meaning: string;
  pronunciation: string | null;
  part_of_speech: string | null;
  example: string | null;
  example_translation: string | null;
  note: string | null;
  synonyms: string[];
  antonyms: string[];
  tags: string[];
  image_url: string | null;
  favorite: boolean;
  mastery_level: number;
  review_count: number;
  correct_count: number;
  wrong_count: number;
  last_reviewed_at: string | null;
  next_review_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ReviewRating = 0 | 1 | 2 | 3;

export type ViewName = "dashboard" | "words" | "flashcards" | "decks" | "stats";
