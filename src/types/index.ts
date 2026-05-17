export interface Card {
  id: string;
  question: string;
}

export type Level = 'light' | 'medium' | 'deep';

export interface Deck {
  id: string;
  name: string;
  emoji: string;
  description: string;
  from: string;
  to: string;
  cards: Card[];
  level: Level;
}
