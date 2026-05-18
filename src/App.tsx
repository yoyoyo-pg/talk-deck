import { useState } from 'react';
import { DeckSelector } from './components/DeckSelector';
import { CardView } from './components/CardView';
import { decks } from './data/decks';
import type { Deck } from './types';

export default function App() {
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);

  if (activeDeck) {
    return <CardView deck={activeDeck} onBack={() => setActiveDeck(null)} />;
  }

  return <DeckSelector decks={decks} onSelect={setActiveDeck} />;
}
