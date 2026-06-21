import { ProductModel } from "../../data/models/ProductModel";

export type MainStackParamList = {
  Tabs: undefined;
  ProductDetails: { product: ProductModel };
  Cart: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
};