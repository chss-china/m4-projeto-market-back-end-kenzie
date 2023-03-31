interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "cleaning" | "food";
  expirationDate: number | Date;
}
type IProductRequest = Omit<IProduct, "id">;
interface IRequestBody extends IProductRequest {
  calories?: string;
}
interface ICleaningProduct extends IProduct {}
interface IFoodProduct extends IProduct {
  calories: number;
}
interface IallProducts extends IProduct {
  total: number;
  marketProducts: IProduct[];
}
export {
  IProduct,
  IProductRequest,
  IFoodProduct,
  IallProducts,
  ICleaningProduct,
  IRequestBody,
};
