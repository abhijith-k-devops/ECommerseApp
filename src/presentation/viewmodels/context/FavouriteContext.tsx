import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductModel } from "../../../data/models/ProductModel";

const FAVORITES_STORAGE_KEY = "app_favorites";

export interface FavouriteContextType {
  favorites: ProductModel[];
  isFavorite: (productId: string | number) => boolean;
  addFavorite: (product: ProductModel) => Promise<void>;
  removeFavorite: (productId: string | number) => Promise<void>;
  toggleFavorite: (product: ProductModel) => Promise<void>;
  isLoading: boolean;
}

export const FavouriteContext = createContext<FavouriteContextType | undefined>(
  undefined
);

export function FavouriteContextProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from AsyncStorage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavorites = async (items: ProductModel[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
      setFavorites(items);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const isFavorite = (productId: string | number): boolean => {
    return favorites.some((fav) => fav.id.toString() === productId.toString());
  };

  const addFavorite = async (product: ProductModel) => {
    if (!isFavorite(product.id)) {
      const updated = [...favorites, product];
      await saveFavorites(updated);
    }
  };

  const removeFavorite = async (productId: string | number) => {
    const updated = favorites.filter(
      (fav) => fav.id.toString() !== productId.toString()
    );
    await saveFavorites(updated);
  };

  const toggleFavorite = async (product: ProductModel) => {
    if (isFavorite(product.id)) {
      await removeFavorite(product.id);
    } else {
      await addFavorite(product);
    }
  };

  const value: FavouriteContextType = {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isLoading,
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
}

