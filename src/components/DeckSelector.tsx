import { useState } from 'react';
import { ChevronRight, Heart } from 'lucide-react';
import type { Deck } from '../types';

type Tab = 'card' | 'game';

interface Props {
  decks: Deck[];
  onSelect: (deck: Deck) => void;
  onStartGame: () => void;
  onShowFavorites: () => void;
  favoritesCount: number;
}

export function DeckSelector({ decks, onSelect, onStartGame, onShowFavorites, favoritesCount }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('card');

  return (
    <div className="h-dvh bg-gradient-to-br from-violet-600 to-pink-500 flex flex-col">
      <header className="relative px-6 pt-10 pb-4 text-center">
        <h1 className="text-white text-4xl font-bold tracking-tight">Talk Deck</h1>
        <button
          onClick={onShowFavorites}
          className="absolute right-4 top-10 text-white/80 hover:text-white p-2 rounded-xl active:bg-white/10 transition-colors"
          aria-label="お気に入り"
        >
          <Heart
            size={22}
            className={favoritesCount > 0 ? 'fill-white text-white' : ''}
          />
        </button>
      </header>

      {/* タブ */}
      <div className="px-4 pb-3">
        <div className="flex bg-white/20 rounded-xl p-1 max-w-xs mx-auto">
          <button
            onClick={() => setActiveTab('card')}
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'card' ? 'bg-white text-gray-800' : 'text-white'
            }`}
          >
            カード
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'game' ? 'bg-white text-gray-800' : 'text-white'
            }`}
          >
            ゲーム
          </button>
        </div>
      </div>

      {activeTab === 'card' ? (
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
                <span className="text-white/50 text-xs mt-1">{deck.cards.length}枚</span>
              </button>
            ))}
          </div>
        </main>
      ) : (
        <main className="flex-1 px-4 pb-6 flex flex-col justify-center">
          <div className="max-w-xs mx-auto w-full">
            <button
              onClick={onStartGame}
              className="w-full bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-left active:bg-white/30 transition-colors shadow-xl"
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">🎯</span>
                <ChevronRight size={20} className="text-white/60 mt-1" />
              </div>
              <p className="text-white font-bold text-xl mt-3">指名ゲーム</p>
              <p className="text-white/70 text-sm mt-1 leading-relaxed">
                名前を登録してランダム指名！<br />みんなで答えよう
              </p>
            </button>
          </div>
        </main>
      )}
    </div>
  );
}
