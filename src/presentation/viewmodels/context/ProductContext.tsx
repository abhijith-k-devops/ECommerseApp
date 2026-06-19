import React, { useEffect } from "react";
import { ProductModel } from "../../../data/models/ProductModel";
import { ProductUseCase } from "../../../domain/usecase/ProductUseCase";
import { ProductRepositoryImpl } from "../../../data/repository/ProductRepositoryImpl";

interface ProductContextProviderProps {
    children: React.ReactNode;
}

export type ProductContextType = {
    products: ProductModel[];
    loading: boolean;
    error: string | null;
};

export const ProductContext = React.createContext<ProductContextType | null>(
    null
);

export function ProductContextProvider({children}: ProductContextProviderProps) {

    const [products, setProducts] = React.useState<ProductModel[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const injectedUseCase: ProductUseCase = new ProductUseCase(new ProductRepositoryImpl());

    async function fetchProducts() {
        setLoading(true);
        setError(null);

        try {
            const data = await injectedUseCase.execute();
            console.log("Fetched products:", data);
            setProducts(data);
        } catch (err) {
            console.error("Fetch products failed:", err);
            const message = err instanceof Error ? err.message : "Failed to fetch products";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductContext.Provider>
    );

}

