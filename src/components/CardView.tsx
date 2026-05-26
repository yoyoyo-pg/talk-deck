import { useState, useCallback } from 'react';
import { ArrowLeft, Shuffle, ChevronRight } from 'lucide-react';
import type { Deck, Card } from '../types';

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

type ViewMode = 'random' | 'list';

interface Props {
  deck: Deck;
  onBack: () => void;
}

export function CardView({ deck, onBack }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('random');
  const [pickedCard, setPickedCard] = useState<Card | null>(null);

  // ── ランダムモード state ──
  const [queue, setQueue] = useState<Card[]>(() => shuffleArray(deck.cards));
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(1);
  const [rotateY, setRotateY] = useState(0);
  const [flipTransition, setFlipTransition] = useState('transform 150ms ease-in-out');

  const flip = useCallback((onMidpoint: () => void) => {
    setFlipTransition('transform 150ms ease-in');
    setRotateY(90);

    setTimeout(() => {
      onMidpoint();
      setFlipTransition('none');
      setRotateY(-90);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlipTransition('transform 150ms ease-out');
          setRotateY(0);
        });
      });
    }, 150);
  }, []);

  const advance = useCallback(() => {
    flip(() => {
      const nextIndex = (index + 1) % queue.length;
      if (nextIndex === 0) {
        setQueue(shuffleArray(deck.cards));
      }
      setIndex(nextIndex);
      setSeen((prev) => prev + 1);
    });
  }, [flip, index, queue.length, deck.cards]);

  const reshuffle = useCallback(() => {
    flip(() => {
      setQueue(shuffleArray(deck.cards));
      setIndex(0);
      setSeen(1);
    });
  }, [flip, deck.cards]);

  const card = queue[index];

  // ── ピックアップビュー（一覧から1枚選択時）──
  if (pickedCard) {
    return (
      <div
        className="h-dvh flex flex-col"
        style={{ background: `linear-gradient(135deg, ${deck.from}, ${deck.to})` }}
      >
        <header className="flex items-center justify-between px-4 pt-10 pb-1">
          <button
            onClick={() => setPickedCard(null)}
            className="text-white/80 hover:text-white p-2 -ml-2 rounded-xl active:bg-white/10 transition-colors"
            aria-label="一覧に戻る"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{deck.emoji}</span>
            <span className="text-white font-bold text-lg">{deck.name}</span>
          </div>
          <div className="w-10" />
        </header>

        <div className="text-center text-white/60 text-sm py-1">ピックアップ</div>

        <div className="flex-1 flex items-center justify-center px-6 py-4">
          <div className="w-full max-w-xs bg-white rounded-3xl shadow-2xl">
            <div className="p-6 flex items-center justify-center min-h-40">
              <p className="text-gray-800 text-xl font-medium leading-relaxed text-center">
                {pickedCard.question}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={() => setPickedCard(null)}
            className="w-full max-w-xs mx-auto block bg-white/20 backdrop-blur-sm text-white font-bold text-lg py-3 rounded-2xl border-2 border-white/30 active:scale-95 transition-transform duration-150"
          >
            一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-dvh flex flex-col"
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
        {viewMode === 'random' ? (
          <button
            onClick={reshuffle}
            className="text-white/80 hover:text-white p-2 -mr-2 rounded-xl active:bg-white/10 transition-colors"
            aria-label="シャッフル"
          >
            <Shuffle size={20} />
          </button>
        ) : (
          <div className="w-10" />
        )}
      </header>

      {/* Mode toggle */}
      <div className="px-4 pt-2 pb-1">
        <div className="flex bg-white/20 rounded-xl p-1 max-w-xs mx-auto">
          <button
            onClick={() => setViewMode('random')}
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'random' ? 'bg-white text-gray-800' : 'text-white'
            }`}
          >
            ランダム
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'list' ? 'bg-white text-gray-800' : 'text-white'
            }`}
          >
            一覧
          </button>
        </div>
      </div>

      {viewMode === 'random' ? (
        <>
          {/* Progress */}
          <div className="text-center text-white/60 text-sm py-1">
            {seen} 枚目
          </div>

          {/* Card */}
          <div className="flex-1 flex items-center justify-center px-6 py-4" style={{ perspective: '800px' }}>
            <div
              className="w-full max-w-xs bg-white rounded-3xl shadow-2xl"
              style={{ transform: `rotateY(${rotateY}deg)`, transition: flipTransition }}
            >
              <div className="p-6 flex items-center justify-center min-h-40">
                <p className="text-gray-800 text-xl font-medium leading-relaxed text-center">
                  {card.question}
                </p>
              </div>
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
        </>
      ) : (
        /* List mode */
        <div className="flex-1 overflow-y-auto px-4 pb-8 pt-2">
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            {deck.cards.map((c) => (
              <button
                key={c.id}
                onClick={() => setPickedCard(c)}
                className="w-full flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-left active:bg-white/30 transition-colors"
              >
                <span className="text-white text-sm font-medium leading-snug flex-1 pr-2">
                  {c.question}
                </span>
                <ChevronRight size={18} className="text-white/70 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
