import { useState } from 'react';
import { LevelSelector } from './components/LevelSelector';
import { DeckSelector } from './components/DeckSelector';
import { CardView } from './components/CardView';
import { decks } from './data/decks';
import type { Deck, Level } from './types';

export default function App() {
  const [level, setLevel] = useState<Level | null>(null);
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);

  if (activeDeck && level) {
    return <CardView deck={activeDeck} onBack={() => setActiveDeck(null)} />;
  }

  if (level) {
    return (
      <DeckSelector
        level={level}
        decks={decks}
        onSelect={setActiveDeck}
        onBack={() => setLevel(null)}
      />
    );
  }

  return <LevelSelector onSelect={setLevel} />;
}
