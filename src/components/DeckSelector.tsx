import type { Deck } from '../types';

interface Props {
  decks: Deck[];
  onSelect: (deck: Deck) => void;
}

export function DeckSelector({ decks, onSelect }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 to-pink-500 flex flex-col">
      <header className="px-6 pt-10 pb-4">
        <h1 className="text-white text-3xl font-bold tracking-tight">Talk Deck</h1>
        <p className="text-white/70 text-sm mt-1">会話のきっかけカード</p>
      </header>

      <main className="flex-1 px-4 pb-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
          {decks.map((deck) => (
            <button
              key={deck.id}
              onClick={() => onSelect(deck)}
              className="flex flex-col items-start p-3 rounded-2xl shadow-lg active:scale-95 transition-transform duration-150 text-left"
              style={{ background: `linear-gradient(135deg, ${deck.from}, ${deck.to})` }}
            >
              <span className="text-3xl mb-1">{deck.emoji}</span>
              <span className="text-white font-bold text-base leading-tight">{deck.name}</span>
              <span className="text-white/70 text-xs mt-1 leading-tight">{deck.description}</span>
              <span className="text-white/50 text-xs mt-1">{deck.cards.length}枚</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}