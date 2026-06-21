import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartModel } from "../../../data/models/CartModel";

const CART_STORAGE_KEY = "cart";

export interface CartContextType {
    cartItems: CartModel[];
    isInCart: (productId: string | number) => boolean;
    addToCart: (item: CartModel) => Promise<void>;
    removeFromCart: (productId: string | number) => Promise<void>;
    updateQuantity: (productId: string | number, quantity: number) => Promise<void>;
    isLoading: boolean;
}

export const CartContext = React.createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = React.useState<CartModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadCartItems = async () => {
        try {
        const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            setCartItems(JSON.parse(stored));
        }
        } catch (error) {
        console.error("Error loading cart items:", error);
        } finally {
        setIsLoading(false);
        }
    };

    const saveCartItems = async (items: CartModel[]) => {
        try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        setCartItems(items);
        } catch (error) {
        console.error("Error saving cart items:", error);
        }
    };

    const isInCart = (productId: string | number): boolean => {
        return cartItems.some((item) => item.id.toString() === productId.toString());
    };

    const addToCart = async (item: CartModel) => {
        const existing = cartItems.find(
            (cartItem) => cartItem.id.toString() === item.id.toString()
        );

        if (existing) {
            const updated = cartItems.map((cartItem) =>
                cartItem.id.toString() === item.id.toString()
                    ? { ...cartItem, quantity: cartItem.quantity + Math.max(1, item.quantity) }
                    : cartItem
            );
            await saveCartItems(updated);
            return;
        }

        const normalizedItem = {
            ...item,
            quantity: Math.max(1, item.quantity),
        };
        const updated = [...cartItems, normalizedItem];
        await saveCartItems(updated);
    };

    const removeFromCart = async (productId: string | number) => {
        const updated = cartItems.filter((item) => item.id.toString() !== productId.toString());
        await saveCartItems(updated);
    };

    const updateQuantity = async (productId: string | number, quantity: number) => {
        const updated = cartItems.map((item) =>
        item.id.toString() === productId.toString() ? { ...item, quantity } : item
        );
        await saveCartItems(updated);
    };

    useEffect(() => {
        loadCartItems();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isInCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                isLoading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}