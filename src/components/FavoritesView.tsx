import { ArrowLeft, Heart } from 'lucide-react';
import type { FavoriteCard } from '../hooks/useFavorites';

interface Props {
  favorites: FavoriteCard[];
  onToggle: (card: FavoriteCard) => void;
  onBack: () => void;
}

export function FavoritesView({ favorites, onToggle, onBack }: Props) {
  return (
    <div className="h-dvh bg-gradient-to-br from-violet-600 to-pink-500 flex flex-col">
      <header className="flex items-center gap-3 px-4 pt-10 pb-4">
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white p-2 -ml-2 rounded-xl active:bg-white/10 transition-colors"
          aria-label="戻る"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white font-bold text-xl">お気に入り</h1>
      </header>

      {favorites.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 pb-12">
          <Heart size={48} className="text-white/30" />
          <p className="text-white/60 text-sm text-center">
            カードのハートをタップすると<br />ここに保存されます
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            {favorites.map((fav) => (
              <div
                key={`${fav.deckId}-${fav.cardId}`}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-base">{fav.deckEmoji}</span>
                      <span className="text-gray-400 text-xs font-medium">{fav.deckName}</span>
                    </div>
                    <p className="text-gray-800 text-sm font-medium leading-snug">
                      {fav.question}
                    </p>
                  </div>
                  <button
                    onClick={() => onToggle(fav)}
                    className="p-1 -mt-0.5 flex-shrink-0"
                    aria-label="お気に入りから削除"
                  >
                    <Heart size={18} className="fill-red-400 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
