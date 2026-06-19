import { ProductRepository } from "../../domain/repository/ProductRepository";
import { ProductService } from "../datasources/remote/ProductService";
import { ProductModel } from "../models/ProductModel";

export class ProductRepositoryImpl implements ProductRepository {
    private productService: ProductService;

    constructor(productService: ProductService = new ProductService()) {
        this.productService = productService;
    }

    async getProducts(): Promise<ProductModel[]> {
        return this.productService.getProducts();
    }
}