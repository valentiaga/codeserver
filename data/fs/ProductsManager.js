const fs = require("fs");
const crypto = require("crypto");

class ProductsManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
    this.init();
  }
  //init unica funcion sincrona ya que tiene que checkear si el archivo existe
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      //SI NO EXISTE creo un array vacio
      const stringData = JSON.stringify([], null, 2);
      //DEFINE EL CONTENIDO
      fs.writeFileSync(this.path, stringData);
      //CREA EL ARCHIVO
      console.log("ARCHIVO CREADO!");
    } else {
      console.log("ARCHIVO YA EXISTE!");
    }
  }

  async create(data) {
    try {
      if (
        !data.title ||
        !data.photo ||
        !data.category ||
        !data.price ||
        !data.stock
      ) {
        throw new Error("Ingrese todos los campos por favor.");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          category: data.category,
          price: data.price,
          stock: data.stock,
        };
        //uso await en lugar de .then
        let arrayProducts = await fs.promises.readFile(this.path, "utf-8");
        arrayProducts = JSON.parse(arrayProducts);
        arrayProducts.push(product);
        arrayProducts = JSON.stringify(arrayProducts, null, 2);
        await fs.promises.writeFile(this.path, arrayProducts);
        console.log({ created: product.id });
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read() {
    try {
      let arrayProducts = await fs.promises.readFile(this.path, "utf-8");
      arrayProducts = JSON.parse(arrayProducts);
      if (arrayProducts.length === 0) {
        throw new Error("No hay usuarios");
      } else {
        console.log(arrayProducts);
        return arrayProducts;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async readOne(id) {
    try {
      let arrayProducts = await fs.promises.readFile(this.path, "utf-8");
      arrayProducts = JSON.parse(arrayProducts);
      let product = arrayProducts.find((each) => each.id === id);
      if (!product) {
        throw new Error("Not found.");
      } else {
        console.log(product);
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(id) {
    try {
      let arrayProducts = await fs.promises.readFile(this.path, "utf-8");
      arrayProducts = JSON.parse(arrayProducts);
      let product = arrayProducts.find((each) => each.id === id);
      //BUSCO LA NOTA
      if (!product) {
        throw new Error("Not found.");
      } else {
        let filtered = arrayProducts.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log({ deleted: product.id });
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function test() {
  try {
    const products = new ProductsManager();
    await products.create({
      title: "pantalon cargo",
      photo: "cargo.jpg",
      category: "pantalon",
      price: 33000,
      stock: 10000,
    });
    await products.create({
      title: "pareo rock",
      photo: "pareo.jpg",
      category: "pareo",
      price: 33000,
      stock: 1000,
    });
    await products.create({
      title: "pareo tull",
      photo: "pareotull.jpg",
      category: "pareo",
      price: 33000,
      stock: 10000,
    });
    await products.create({
      title: "guantes tull",
      photo: "guantes.jpg",
      category: "accesorio",
      price: 33000,
      stock: 5000,
    });
    await products.create({
      title: "gorro",
      photo: "gorro.jpg",
      category: "accesorio",
      price: 20000,
      stock: 1000,
    });
    await products.create({
      title: "bufanda ross",
      photo: "bufross.jpg",
      category: "accesorio",
      price: 25000,
      stock: 1000,
    });
    await products.create({
      title: "capufanda densell",
      photo: "capufanda.jpg",
      category: "accesorio",
      price: 15000,
      stock: 1000,
    });
    await products.create({
      title: "medias térmicas",
      photo: "medias.jpg",
      category: "accesorio",
      price: 10000,
      stock: 1000,
    });
    await products.create({
      title: "remera térmica",
      photo: "remera.jpg",
      category: "remeras",
      price: 35000,
      stock: 1000,
    });
    await products.create({
      title: "campera puffer",
      photo: "campera.jpg",
      category: "accesorio",
      price: 100000,
      stock: 1000,
    });
    await products.read();
  } catch (error) {
    console.log(error);
  }
}
/* test(); */
