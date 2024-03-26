import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor() {
    this.path = "./data/fs/files/users.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Document created");
    } else {
      console.log("Document already exists");
    }
  }

  async create(data) {
    try {
      if (!data.email || !data.photo || !data.password) {
        throw new Error("Complete all the fields please.");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          email: data.email,
          photo: data.photo,
          password: data.password,
          role: 0,
        };
        //uso await en lugar de .then
        let arrayUsers = await fs.promises.readFile(this.path, "utf-8");
        arrayUsers = JSON.parse(arrayUsers);
        arrayUsers.push(user);
        arrayUsers = JSON.stringify(arrayUsers, null, 2);
        await fs.promises.writeFile(this.path, arrayUsers);
        console.log({ created: user.id });
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read() {
    try {
      let arrayUsers = await fs.promises.readFile(this.path, "utf-8");
      arrayUsers = JSON.parse(arrayUsers);
      if (arrayUsers.length === 0) {
        throw new Error("No hay usuarios");
      } else {
        console.log(arrayUsers);
        return arrayUsers;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async readOne(id) {
    try {
      let arrayUsers = await fs.promises.readFile(this.path, "utf-8");
      arrayUsers = JSON.parse(arrayUsers);
      let user = arrayUsers.find((each) => each.id === id);
      if (!user) {
        throw new Error("Not found.");
      } else {
        console.log(user);
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(id) {
    try {
      let arrayUsers = await fs.promises.readFile(this.path, "utf-8");
      arrayUsers = JSON.parse(arrayUsers);
      let user = arrayUsers.find((each) => each.id === id);
      if (!user) {
        throw new Error("Not found.");
      } else {
        let filtered = arrayUsers.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log({ deleted: user.id });
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function test() {
  try {
    const users = new UsersManager();
    await users.create({
      email: "javierlucrecio@gmail.com",
      photo: "photo1",
      password: "pass1",
    });
    await users.create({
      email: "nestorgirolami@gmail.com",
      photo: "photo2",
      password: "pass2",
    });
    await users.create({
      email: "amandakaya@gmail.com",
      photo: "photo3",
      password: "pass3",
    });
    await users.create({
      email: "theolocomora@gmail.com",
      photo: "photo4",
      password: "pass4",
    });
    await users.read();
  } catch (error) {
    console.log(error);
  }
}
/* test();
 */
const usersManager = new UsersManager()
export default usersManager
