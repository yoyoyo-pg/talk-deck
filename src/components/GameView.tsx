import { useState } from 'react';
import { ArrowLeft, Plus, X, Play } from 'lucide-react';
import type { Deck, Card } from '../types';

type GamePhase = 'setup' | 'playing';

interface Props {
  decks: Deck[];
  onBack: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function GameView({ decks, onBack }: Props) {
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [names, setNames] = useState<string[]>(['', '']);
  const [selectedDeckId, setSelectedDeckId] = useState<string>(decks[0].id);

  // ゲーム中の state
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [cardQueue, setCardQueue] = useState<Card[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [lastPlayerIndex, setLastPlayerIndex] = useState(-1);

  const selectedDeck = decks.find(d => d.id === selectedDeckId) ?? decks[0];
  const validNames = names.filter(n => n.trim().length > 0);

  const pickNext = (
    playerList: string[],
    queue: Card[],
    idx: number,
    lastIdx: number,
    deck: Deck,
  ) => {
    let playerIdx: number;
    if (playerList.length === 1) {
      playerIdx = 0;
    } else {
      do {
        playerIdx = Math.floor(Math.random() * playerList.length);
      } while (playerIdx === lastIdx);
    }

    let newQueue = queue;
    let newIdx = idx;
    if (newIdx >= newQueue.length) {
      newQueue = shuffleArray(deck.cards);
      newIdx = 0;
    }

    setCurrentPlayer(playerList[playerIdx]);
    setLastPlayerIndex(playerIdx);
    setCurrentCard(newQueue[newIdx]);
    setCardQueue(newQueue);
    setCardIndex(newIdx + 1);
  };

  const startGame = () => {
    const playerList = validNames;
    const queue = shuffleArray(selectedDeck.cards);
    setPlayers(playerList);
    pickNext(playerList, queue, 0, -1, selectedDeck);
    setPhase('playing');
  };

  const nextRound = () => {
    pickNext(players, cardQueue, cardIndex, lastPlayerIndex, selectedDeck);
  };

  const backToSetup = () => {
    setPhase('setup');
    setLastPlayerIndex(-1);
  };

  // ── ゲーム中画面 ──────────────────────────────────────────────────
  if (phase === 'playing' && currentCard) {
    return (
      <div
        className="h-dvh flex flex-col"
        style={{ background: `linear-gradient(135deg, ${selectedDeck.from}, ${selectedDeck.to})` }}
      >
        <header className="flex items-center justify-between px-4 pt-10 pb-1">
          <button
            onClick={backToSetup}
            className="text-white/80 hover:text-white p-2 -ml-2 rounded-xl active:bg-white/10 transition-colors"
            aria-label="設定に戻る"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedDeck.emoji}</span>
            <span className="text-white font-bold text-lg">指名ゲーム</span>
          </div>
          <div className="w-10" />
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 gap-5">
          <div className="text-center">
            <p className="text-white/70 text-sm mb-1">今回の指名</p>
            <p className="text-white text-4xl font-bold tracking-wide">{currentPlayer}</p>
          </div>

          <div className="w-full max-w-xs bg-white rounded-3xl shadow-2xl">
            <div className="p-6 flex items-center justify-center min-h-40">
              <p className="text-gray-800 text-xl font-medium leading-relaxed text-center">
                {currentCard.question}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={nextRound}
            className="w-full max-w-xs mx-auto block bg-white/20 backdrop-blur-sm text-white font-bold text-lg py-3 rounded-2xl border-2 border-white/30 active:scale-95 transition-transform duration-150"
          >
            次の指名へ
          </button>
        </div>
      </div>
    );
  }

  // ── セットアップ画面 ──────────────────────────────────────────────
  return (
    <div className="h-dvh bg-gradient-to-br from-violet-600 to-pink-500 flex flex-col">
      <header className="flex items-center justify-between px-4 pt-10 pb-4">
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white p-2 -ml-2 rounded-xl active:bg-white/10 transition-colors"
          aria-label="戻る"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="text-white font-bold text-lg">指名ゲーム</span>
        <div className="w-10" />
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="max-w-xs mx-auto flex flex-col gap-6">

          {/* 参加者入力 */}
          <section>
            <p className="text-white font-semibold mb-2">参加者</p>
            <div className="flex flex-col gap-2">
              {names.map((name, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setNames(prev => prev.map((n, idx) => idx === i ? e.target.value : n))}
                    placeholder={`名前 ${i + 1}`}
                    className="flex-1 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/40 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:bg-white/30 transition-colors"
                  />
                  {names.length > 2 && (
                    <button
                      onClick={() => setNames(prev => prev.filter((_, idx) => idx !== i))}
                      className="text-white/60 hover:text-white p-1 rounded-lg active:bg-white/10 transition-colors"
                      aria-label="削除"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setNames(prev => [...prev, ''])}
                className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm py-1 transition-colors"
              >
                <Plus size={16} />
                <span>追加する</span>
              </button>
            </div>
          </section>

          {/* デッキ選択 */}
          <section>
            <p className="text-white font-semibold mb-2">デッキを選ぶ</p>
            <div className="grid grid-cols-2 gap-2">
              {decks.map(deck => (
                <button
                  key={deck.id}
                  onClick={() => setSelectedDeckId(deck.id)}
                  className={`flex flex-col items-start p-3 rounded-2xl shadow-lg active:scale-95 transition-all text-left ${
                    selectedDeckId === deck.id
                      ? 'ring-2 ring-white scale-[1.02]'
                      : 'opacity-60'
                  }`}
                  style={{ background: `linear-gradient(135deg, ${deck.from}, ${deck.to})` }}
                >
                  <span className="text-2xl mb-1">{deck.emoji}</span>
                  <span className="text-white font-bold text-sm leading-tight">{deck.name}</span>
                </button>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* スタートボタン */}
      <div className="px-6 pb-8 pt-2">
        <button
          onClick={startGame}
          disabled={validNames.length < 2}
          className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 bg-white text-violet-600 font-bold text-lg py-3 rounded-2xl shadow-lg active:scale-95 transition-transform duration-150 disabled:opacity-40 disabled:pointer-events-none"
        >
          <Play size={20} />
          ゲームスタート！
        </button>
      </div>
    </div>
  );
}
