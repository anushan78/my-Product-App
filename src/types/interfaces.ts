import { ProductEnum } from "./enums";

export interface IFormInput {
  productName: string;
  category: ProductEnum;
  quantity: number;
}
