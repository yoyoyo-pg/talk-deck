import { useState } from 'react';
import { ModeSelector } from './components/ModeSelector';
import { DeckSelector } from './components/DeckSelector';
import { CardView } from './components/CardView';
import { decks } from './data/decks';
import type { Deck, Mode } from './types';

export default function App() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);

  if (activeDeck && mode) {
    return (
      <CardView
        deck={activeDeck}
        onBack={() => setActiveDeck(null)}
      />
    );
  }

  if (mode) {
    return (
      <DeckSelector
        mode={mode}
        decks={decks}
        onSelect={setActiveDeck}
        onBack={() => setMode(null)}
      />
    );
  }

  return <ModeSelector onSelect={setMode} />;
}
