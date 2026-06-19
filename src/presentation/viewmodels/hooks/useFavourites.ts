import { useContext } from "react";
import { FavouriteContext, FavouriteContextType } from "../context/FavouriteContext";

export function useFavorites(): FavouriteContextType {
  const context = useContext(FavouriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavouriteContextProvider");
  }
  return context;
}