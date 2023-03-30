import express, { json, Application, Request, Response } from "express";
import {
  createProducts,
  getProducts,
  searchId,
  updateProducts,
  deleteProducts,
} from "./logic";

import { middlewareNameProducts, middlewareIdProducts } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/products", middlewareNameProducts, createProducts);

app.get("/products", getProducts);
app.get("/products/:id", middlewareIdProducts, searchId);
app.patch(
  "/products/:id",
  middlewareNameProducts,
  middlewareIdProducts,
  updateProducts
);
app.delete("/products/:id", middlewareIdProducts, deleteProducts);
app.listen(3000, () => {
  console.log("Server is running");
});
