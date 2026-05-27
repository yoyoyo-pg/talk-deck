import { useState, useCallback } from 'react';

export interface FavoriteCard {
  deckId: string;
  deckName: string;
  deckEmoji: string;
  cardId: string;
  question: string;
}

const STORAGE_KEY = 'talk-deck-favorites';

function load(): FavoriteCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoriteCard[]) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCard[]>(load);

  const toggle = useCallback((card: FavoriteCard) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.deckId === card.deckId && f.cardId === card.cardId
      );
      const next = exists
        ? prev.filter((f) => !(f.deckId === card.deckId && f.cardId === card.cardId))
        : [...prev, card];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (deckId: string, cardId: string) =>
      favorites.some((f) => f.deckId === deckId && f.cardId === cardId),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
}
