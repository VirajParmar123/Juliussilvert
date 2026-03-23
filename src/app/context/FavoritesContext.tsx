import { createContext, useContext, useState, ReactNode } from 'react';

export interface FavoriteItem {
  id: string;
  image: string;
  name: string;
  itemNumber: string;
  wasmNumber: string;
  price: number;
  unit: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.find(fav => fav.id === item.id);
      if (exists) return prevFavorites;
      return [...prevFavorites, item];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
