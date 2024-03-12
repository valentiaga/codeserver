class ProductsManager {
    static #products = [];
    create(data) {
      const user = {
        id:
          ProductsManager.#products.length === 0
            ? 1
            : ProductsManager.#products[ProductsManager.#products.length - 1].id +
              1,
        title: data.title,
        photo: data.photo,
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      ProductsManager.#products.push(user);
      console.log("producto creado");
    }
    read() {
      return ProductsManager.#products;
    }
  }
  
  const gestorProductos = new ProductsManager();
  
  gestorProductos.create({
    title: "pantalon cargo",
    photo: "cargo.jpg",
    category: "pantalon",
    price: 33000,
    stock: 10000,
  });
  
  gestorProductos.create({
    title: "pareo rock",
    photo: "pareo.jpg",
    category: "pareo",
    price: 33000,
    stock: 1000,
  });
  
  gestorProductos.create({
    title: "pareo tull",
    photo: "pareotull.jpg",
    category: "pareo",
    price: 33000,
    stock: 10000,
  });
  
  gestorProductos.create({
    title: "guantes tull",
    photo: "guantes.jpg",
    category: "accesorio",
    price: 33000,
    stock: 5000,
  });
  
  gestorProductos.create({
    title: "gorro",
    photo: "gorro.jpg",
    category: "accesorio",
    price: 20000,
    stock: 1000,
  });
  
  console.log(gestorProductos.read());