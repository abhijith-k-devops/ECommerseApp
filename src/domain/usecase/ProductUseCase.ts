import { ProductRepository } from "../repository/ProductRepository";

export class ProductUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute() {
        return this.productRepository.getProducts();
    }
}