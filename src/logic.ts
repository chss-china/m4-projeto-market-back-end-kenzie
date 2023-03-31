import { Request, Response } from "express";
import market from "./database";
import {
  IProduct,
  IProductRequest,
  IFoodProduct,
  IallProducts,
  ICleaningProduct,
} from "./interface";
const createProducts = (request: Request, response: Response): Response => {
  const productsData: IProductRequest[] = request.body;
  const todayDate = new Date();
  const expirationDate = new Date(
    todayDate.getFullYear() + 1,
    todayDate.getMonth(),
    todayDate.getDate()
  );

  const productsMap = productsData.map((data: IProductRequest) => {
    const id = market[market.length - 1] ? market[market.length - 1].id + 1 : 1;
    const newProduct: IProduct = {
      id: id,
      ...data,
      expirationDate,
    };
    market.push(newProduct);
    return newProduct;
  });
  const initialValue = 0;
  const totalProducts = productsMap.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    initialValue
  );
  const allProducts = {
    total: totalProducts,
    marketProducts: productsMap,
  };

  return response.status(201).json(allProducts);
};
const getProducts = (request: Request, response: Response): Response => {
  const initialValue = 0;
  const totalProducts = market.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    initialValue
  );

  const allProducts = {
    total: totalProducts,
    marketProducts: market,
  };

  const listProducts: any = request.query.section;
  if (!listProducts) {
    return response.json(allProducts);
  }
  const productsFilter = allProducts.marketProducts.filter(
    (product) => product.section == listProducts
  );
  const initialValueFilter = 0;
  const totalProductsFilter = productsFilter.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    initialValueFilter
  );
  const allProductsFilter = {
    total: totalProductsFilter,
    marketProducts: productsFilter,
  };
  return response.json(allProductsFilter);
};

const searchId = (request: Request, response: Response): Response => {
  const index = response.locals.product.indexProduct;

  return response.json(market[index]);
};
const updateProducts = (request: Request, response: Response): Response => {
  const index = response.locals.product.indexProduct;
  const updatedProduct: IFoodProduct | ICleaningProduct = market[index];
  console.log(market[index]);
  const { name, price, weight, calories } = request.body;

  market[index] = {
    ...updatedProduct,
    ...request.body,
  };

  return response.json(market[index]);
};
const deleteProducts = (request: Request, response: Response): Response => {
  const index = response.locals.product.indexProduct;
  market.splice(index, 1);

  return response.status(204).send();
};

export {
  createProducts,
  getProducts,
  searchId,
  updateProducts,
  deleteProducts,
};
