import { useState, useCallback } from 'react';
import { ArrowLeft, Shuffle } from 'lucide-react';
import type { Deck, Card } from '../types';

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

interface Props {
  deck: Deck;
  onBack: () => void;
}

export function CardView({ deck, onBack }: Props) {
  const [queue, setQueue] = useState<Card[]>(() => shuffleArray(deck.cards));
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [seen, setSeen] = useState(1);

  const advance = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      const nextIndex = (index + 1) % queue.length;
      if (nextIndex === 0) {
        setQueue(shuffleArray(deck.cards));
      }
      setIndex(nextIndex);
      setSeen((prev) => prev + 1);
      setIsVisible(true);
    }, 200);
  }, [index, queue.length, deck.cards]);

  const reshuffle = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setQueue(shuffleArray(deck.cards));
      setIndex(0);
      setSeen(1);
      setIsVisible(true);
    }, 200);
  }, [deck.cards]);

  const card = queue[index];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: `linear-gradient(135deg, ${deck.from}, ${deck.to})` }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-10 pb-1">
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white p-2 -ml-2 rounded-xl active:bg-white/10 transition-colors"
          aria-label="戻る"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{deck.emoji}</span>
          <span className="text-white font-bold text-lg">{deck.name}</span>
        </div>
        <button
          onClick={reshuffle}
          className="text-white/80 hover:text-white p-2 -mr-2 rounded-xl active:bg-white/10 transition-colors"
          aria-label="シャッフル"
        >
          <Shuffle size={20} />
        </button>
      </header>

      {/* Progress */}
      <div className="text-center text-white/60 text-sm py-1">
        {seen} 枚目
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <div
          className="w-full max-w-xs bg-white rounded-3xl shadow-2xl p-6 min-h-36 flex items-center justify-center transition-all duration-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          <p className="text-gray-800 text-xl font-medium leading-relaxed text-center">
            {card.question}
          </p>
        </div>
      </div>

      {/* Next button */}
      <div className="px-6 pb-8">
        <button
          onClick={advance}
          className="w-full max-w-xs mx-auto block bg-white/20 backdrop-blur-sm text-white font-bold text-lg py-3 rounded-2xl border-2 border-white/30 active:scale-95 transition-transform duration-150"
        >
          次のカードへ
        </button>
      </div>
    </div>
  );
}