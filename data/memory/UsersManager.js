const crypto = require("crypto");

class UsersManager {
  static #users = [];
  create(data) {
    try {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo: data.photo,
          email: data.email,
          password: data.password,
          role: 0,
        };
        UsersManager.#users.push(user);
        console.log("User created");
    } catch (error) {
        console.log(error);
    }
  }
  read() {
    try {
        return UsersManager.#users;
    } catch (error) {
        console.log(error);
    }
  }
  readOne(id) {
    try {
      let user = UsersManager.#users.find((each) => each.id === id);
      if (!user) {
        throw new Error("Not found.");
      } else {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  destroy(id) {
    try {
      let user = UsersManager.#users.find((each) => each.id === id);
      if (!user) {
        throw new Error("Not found.");
      } else {
        UsersManager.#users = UsersManager.#users.filter((each) => each.id !== id);
        console.log({ deleted: user.id });
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
const gestorUsuarios = new UsersManager();

// gestorUsuarios.create({
//   email: "javierlucrecio@gmail.com",
//   photo: "photo1",
//   password: "pass1",
// });
// gestorUsuarios.create({
//   email: "nestorgirolami@gmail.com",
//   photo: "photo2",
//   password: "pass2",
// });
// gestorUsuarios.create({
//   email: "amandakaya@gmail.com",
//   photo: "photo3",
//   password: "pass3",
// });
// gestorUsuarios.create({
//   email: "theolocomora@gmail.com",
//   photo: "photo4",
//   password: "pass4",
// });


// console.log(gestorUsuarios.read());
// // console.log(gestorUsuarios.readOne(1));

