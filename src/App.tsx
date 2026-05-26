import { useState } from 'react';
import { DeckSelector } from './components/DeckSelector';
import { CardView } from './components/CardView';
import { GameView } from './components/GameView';
import { decks } from './data/decks';
import type { Deck } from './types';

export default function App() {
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [gameMode, setGameMode] = useState(false);

  if (gameMode) {
    return <GameView decks={decks} onBack={() => setGameMode(false)} />;
  }

  if (activeDeck) {
    return <CardView deck={activeDeck} onBack={() => setActiveDeck(null)} />;
  }

  return (
    <DeckSelector
      decks={decks}
      onSelect={setActiveDeck}
      onStartGame={() => setGameMode(true)}
    />
  );
}
