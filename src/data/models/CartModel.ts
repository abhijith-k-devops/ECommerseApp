import { ProductModel } from './ProductModel';

export interface CartModel extends ProductModel {
  quantity: number;
}
