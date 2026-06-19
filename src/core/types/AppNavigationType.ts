import { ProductModel } from "../../data/models/ProductModel";

export type MainStackParamList = {
  Tabs: undefined;
  ProductDetails: { product: ProductModel };
};

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
};