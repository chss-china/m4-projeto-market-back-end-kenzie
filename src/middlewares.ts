import { NextFunction, Request, Response } from "express";
import market from "./database";
import {
  IProduct,
  IProductRequest,
  IFoodProduct,
  IallProducts,
  ICleaningProduct,
  IRequestBody,
} from "./interface";
const middlewareNameProducts = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (request.method === "POST") {
    const requestBody: IRequestBody[] = request.body;
    for (var j = 0; j < requestBody.length; j++) {
      for (var i = 0; i < market.length; i++) {
        if (requestBody[j].name === market[i].name) {
          return response.status(409).json({
            error: "Product already registered",
          });
        }
      }
    }
  } else if (request.method === "PATCH") {
    for (var b = 0; b < market.length; b++) {
      if (request.body.name === market[b].name) {
        return response.status(409).json({
          error: "Product already registered",
        });
      }
    }
  }

  return next();
};
const middlewareIdProducts = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id = parseInt(request.params.id);

  const findIndex = market.findIndex((product) => product.id === id);

  if (findIndex === -1) {
    return response.status(404).json({
      error: "Product not found",
    });
  }

  response.locals.product = {
    idProduct: id,
    indexProduct: findIndex,
  };

  return next();
};

export { middlewareNameProducts, middlewareIdProducts };
