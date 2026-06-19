import { CustomPillType } from "../../core/components/CustomPill";
import { ProductModel } from "../models/ProductModel";

export class ProductMapper {
    static toProductModel(product: any): ProductModel {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            strikeThroughPrice: product.strikePrice,
            images: product.images,
            pillType: product.tag as CustomPillType,
        };
    }
}