export interface Card {
  id: string;
  question: string;
}

export type Mode = 'romance' | 'friends';
export type DeckMode = Mode | 'both';

export interface Deck {
  id: string;
  name: string;
  emoji: string;
  description: string;
  from: string;
  to: string;
  cards: Card[];
  mode: DeckMode;
}
