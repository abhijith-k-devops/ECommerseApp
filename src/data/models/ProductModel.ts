import { CustomPillType } from "../../core/components/CustomPill";

export interface ProductModel {
    id: string;
    name: string;
    description: string;
    price: number;
    strikeThroughPrice?: number;
    images: [string];
    pillType?: CustomPillType;
}
