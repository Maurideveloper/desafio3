// const express = require("express");
import { ProductManager } from "../productManager.js";

import express from "express";
const app = express();
const PORT = 5000;


const manager = new ProductManager("./productos.json");


app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send(
      'Bienvenido ❗ <hr> ✅ Ver listado de productos => <a href="http://localhost:5000/products"> Ver </a> <hr> ✅ Ver lista de hasta 2 productos => <a href="http://localhost:5000/products?limit=2"> Ver </a> <hr> ✅Ver solo el productos con id 3 => <a href="http://localhost:5000/products/3"> Ver </a>');
});

app.get("/products", async (req, res) => {
  const { limit } = req.query; // Cambiado de req.params a req.query
  
  const products = await manager.getProducts();

  //Definimos si es true
  if (limit) {
    const limitNumber = Number(limit); //Lo transformamos en numero
    if (isNaN(limitNumber)) {
      res.send("El limite no es correcto");
    }
    //cortamos el array dependiedo del limit
    const limitedProducts = products.slice(0, limitNumber);
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

//LOGICA DE LIMIT PERO DEFINIDA EN PARAMS!

/*app.get("/products/:limit", async (req, res) => {
  const { limit } = req.params;

  const products = await manager.getProducts();

  if (limit) {
    const limitNumber = Number(limit);
    if (isNaN(limitNumber)) {
      return res.status(400).json({ error: "Invalid limit parameter" });
    }

    const limitedProducts = products.slice(0, limitNumber);
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});*/

app.get("/products/:id", async (req, res) => {

  const { id } = req.params;
  if (id) {
    const products = await manager.getProducts();
    //buscamos el id comparado con p.id
    const productFilter = products.find((p) => p.id === Number(id));

    if (productFilter) {
      res.json(productFilter);
    } else {
      res.json({ error: 'No se encontro ningun producto con ese ID' });
    }
}})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
