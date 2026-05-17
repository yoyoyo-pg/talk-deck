import { ChevronLeft } from 'lucide-react';
import type { Deck, Mode } from '../types';

interface Props {
  mode: Mode;
  decks: Deck[];
  onSelect: (deck: Deck) => void;
  onBack: () => void;
}

const modeLabel: Record<Mode, string> = {
  romance: '恋愛・パートナー',
  friends: '友人・みんなで',
};

export function DeckSelector({ mode, decks, onSelect, onBack }: Props) {
  const filtered = decks.filter((d) => d.mode === mode || d.mode === 'both');

  return (
    <div className="h-dvh bg-gradient-to-br from-violet-600 to-pink-500 flex flex-col">
      <header className="px-4 pt-10 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/70 hover:text-white transition-colors mb-3"
        >
          <ChevronLeft size={20} />
          <span className="text-sm">モード選択</span>
        </button>
        <h1 className="text-white text-3xl font-bold tracking-tight">Talk Deck</h1>
        <p className="text-white/70 text-sm mt-1">{modeLabel[mode]}</p>
      </header>

      <main className="flex-1 px-4 pb-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
          {filtered.map((deck) => (
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
