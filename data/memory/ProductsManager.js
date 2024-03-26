const crypto = require("crypto");

class ProductsManager {
  static #products = [];
  create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      ProductsManager.#products.push(product);
      console.log("Product created");
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      return ProductsManager.#products;
    } catch (error) {
      console.log(error);
    }
  }
  readOne(id) {
    try {
      let product = ProductsManager.#products.find((each) => each.id === id);
      if (!product) {
        throw new Error("Not found.");
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  destroy(id) {
    try {
      let product = ProductsManager.#products.find((each) => each.id === id);
      if (!product) {
        throw new Error("Not found.");
      } else {
        ProductsManager.#products = ProductsManager.#products.filter(
          (each) => each.id !== id
        );
        console.log({ deleted: product.id });
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorProductos = new ProductsManager();

// gestorProductos.create({
//   title: "pantalon cargo",
//   photo: "cargo.jpg",
//   category: "pantalon",
//   price: 33000,
//   stock: 10000,
// });
// gestorProductos.create({
//   title: "pareo rock",
//   photo: "pareo.jpg",
//   category: "pareo",
//   price: 33000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "pareo tull",
//   photo: "pareotull.jpg",
//   category: "pareo",
//   price: 33000,
//   stock: 10000,
// });
// gestorProductos.create({
//   title: "guantes tull",
//   photo: "guantes.jpg",
//   category: "accesorio",
//   price: 33000,
//   stock: 5000,
// });
// gestorProductos.create({
//   title: "gorro",
//   photo: "gorro.jpg",
//   category: "accesorio",
//   price: 20000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "bufanda ross",
//   photo: "bufross.jpg",
//   category: "accesorio",
//   price: 25000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "capufanda densell",
//   photo: "capufanda.jpg",
//   category: "accesorio",
//   price: 15000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "medias térmicas",
//   photo: "medias.jpg",
//   category: "accesorio",
//   price: 10000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "remera térmica",
//   photo: "remera.jpg",
//   category: "remeras",
//   price: 35000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "campera puffer",
//   photo: "campera.jpg",
//   category: "accesorio",
//   price: 100000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "remera oversized",
//   photo: "remov.jpg",
//   category: "remeras",
//   price: 33000,
//   stock: 10000,
// });
// gestorProductos.create({
//   title: "pareo funk",
//   photo: "pareof.jpg",
//   category: "pareo",
//   price: 33000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "remera dark",
//   photo: "remdark.jpg",
//   category: "remeras",
//   price: 33000,
//   stock: 10000,
// });
// gestorProductos.create({
//   title: "guantes lana",
//   photo: "guantesl.jpg",
//   category: "accesorio",
//   price: 15000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "gorro lana",
//   photo: "gorrol.jpg",
//   category: "accesorio",
//   price: 12000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "bufanda beaver creek",
//   photo: "bufbc.jpg",
//   category: "accesorio",
//   price: 25000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "capufanda beaver creek",
//   photo: "capufandabc.jpg",
//   category: "accesorio",
//   price: 15000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "vestido tull",
//   photo: "vestido.jpg",
//   category: "vestido",
//   price: 40000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "vestido rock",
//   photo: "vestidorock.jpg",
//   category: "vestido",
//   price: 35000,
//   stock: 1000,
// });
// gestorProductos.create({
//   title: "campera impermeable",
//   photo: "camperai.jpg",
//   category: "campera",
//   price: 150000,
//   stock: 1000,
// });

// console.log(gestorProductos.read());
// console.log(gestorProductos.readOne(79a3e382c67b6f633a0aaf0c));
// gestorProductos.destroy(c7075d08f59c271e954054b9);
// console.log(gestorProductos.read());
