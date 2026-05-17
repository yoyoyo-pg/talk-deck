import type { Level } from '../types';

interface Props {
  onSelect: (level: Level) => void;
}

const levels: { level: Level; emoji: string; label: string; description: string; from: string; to: string }[] = [
  {
    level: 'light',
    emoji: '🎉',
    label: 'ライトに盛り上がる',
    description: '気軽に楽しめる話題からスタート',
    from: '#10b981',
    to: '#06b6d4',
  },
  {
    level: 'medium',
    emoji: '💬',
    label: 'じっくり語る',
    description: '自分のことをゆっくり話してみよう',
    from: '#f59e0b',
    to: '#f97316',
  },
  {
    level: 'deep',
    emoji: '🔥',
    label: '本音で話す',
    description: 'ちょっと深い話に踏み込んでみよう',
    from: '#f43f5e',
    to: '#a855f7',
  },
];

export function LevelSelector({ onSelect }: Props) {
  return (
    <div className="h-dvh bg-gradient-to-br from-violet-600 to-pink-500 flex flex-col">
      <header className="px-6 pt-10 pb-4 text-center">
        <h1 className="text-white text-4xl font-bold tracking-tight">Talk Deck</h1>
        <p className="text-white/70 text-sm mt-2">会話のきっかけカード</p>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-2 pb-8 max-w-sm mx-auto w-full">
        <p className="text-white/80 text-center text-sm font-medium mb-3">
          どんな話をしますか？
        </p>

        <div className="flex-1 flex flex-col gap-3 justify-center">
          {levels.map(({ level, emoji, label, description, from, to }) => (
            <button
              key={level}
              onClick={() => onSelect(level)}
              className="py-11 flex items-center gap-4 px-5 rounded-3xl shadow-xl active:scale-95 transition-transform duration-150 text-left"
              style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
            >
              <span className="text-5xl leading-none">{emoji}</span>
              <div>
                <div className="text-white font-bold text-xl leading-tight">{label}</div>
                <div className="text-white/70 text-sm mt-1 leading-snug">{description}</div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
