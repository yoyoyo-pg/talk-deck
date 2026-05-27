import { useState } from 'react';
import { DeckSelector } from './components/DeckSelector';
import { CardView } from './components/CardView';
import { GameView } from './components/GameView';
import { FavoritesView } from './components/FavoritesView';
import { useFavorites } from './hooks/useFavorites';
import { decks } from './data/decks';
import type { Deck } from './types';

export default function App() {
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [gameMode, setGameMode] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites, toggle, isFavorite } = useFavorites();

  if (gameMode) {
    return <GameView decks={decks} onBack={() => setGameMode(false)} />;
  }

  if (showFavorites) {
    return (
      <FavoritesView
        favorites={favorites}
        onToggle={toggle}
        onBack={() => setShowFavorites(false)}
      />
    );
  }

  if (activeDeck) {
    return (
      <CardView
        deck={activeDeck}
        onBack={() => setActiveDeck(null)}
        isFavorite={isFavorite}
        onToggleFavorite={toggle}
      />
    );
  }

  return (
    <DeckSelector
      decks={decks}
      onSelect={setActiveDeck}
      onStartGame={() => setGameMode(true)}
      onShowFavorites={() => setShowFavorites(true)}
      favoritesCount={favorites.length}
    />
  );
}
