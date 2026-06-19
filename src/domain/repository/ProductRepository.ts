import { ProductModel } from "../../data/models/ProductModel";

export interface ProductRepository {
    getProducts(): Promise<ProductModel[]>;
}