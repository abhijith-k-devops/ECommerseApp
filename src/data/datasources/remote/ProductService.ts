import { ProductMapper } from "../../mappers/ProductMapper";
import { ProductModel } from "../../models/ProductModel";
import { API_URL } from "../../../core/util/AppConstants";

export class ProductService {
    
    async getProducts(): Promise<ProductModel[]> {
        return fetch(API_URL)
            .then(response => response.json())
            .then((data: ProductModel[]) => {
                return data.map(product => (
                    ProductMapper.toProductModel(product)
                ));
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                throw error;
            });
    }
}