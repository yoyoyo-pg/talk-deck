import type { Mode } from '../types';

interface Props {
  onSelect: (mode: Mode) => void;
}

export function ModeSelector({ onSelect }: Props) {
  return (
    <div className="h-dvh bg-gradient-to-br from-violet-600 to-pink-500 flex flex-col">
      <header className="px-6 pt-12 pb-6 text-center">
        <h1 className="text-white text-4xl font-bold tracking-tight">Talk Deck</h1>
        <p className="text-white/70 text-sm mt-2">会話のきっかけカード</p>
      </header>

      <main className="flex-1 flex flex-col justify-center gap-4 px-6 pb-12 max-w-sm mx-auto w-full">
        <p className="text-white/80 text-center text-sm font-medium mb-2">
          どちらのモードで話しますか？
        </p>

        <button
          onClick={() => onSelect('friends')}
          className="flex items-start gap-4 p-5 rounded-3xl shadow-xl active:scale-95 transition-transform duration-150 text-left"
          style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
        >
          <span className="text-5xl leading-none">👫</span>
          <div>
            <div className="text-white font-bold text-xl leading-tight">友人・みんなで</div>
            <div className="text-white/70 text-sm mt-1 leading-snug">
              気軽に盛り上がろう
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('romance')}
          className="flex items-start gap-4 p-5 rounded-3xl shadow-xl active:scale-95 transition-transform duration-150 text-left"
          style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899)' }}
        >
          <span className="text-5xl leading-none">💕</span>
          <div>
            <div className="text-white font-bold text-xl leading-tight">恋愛・パートナー</div>
            <div className="text-white/70 text-sm mt-1 leading-snug">
              二人の価値観を深掘りしよう
            </div>
          </div>
        </button>
      </main>
    </div>
  );
}
