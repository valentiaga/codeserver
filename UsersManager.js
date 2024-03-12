class UsersManager {
    static #users = []
    create(data) {
        const user = {
            id: UsersManager.#users.length === 0 ? 1 : UsersManager.#users[UsersManager.#users.length - 1].id + 1,
            photo: data.photo,
            email: data.email,
            password: data.password,
            role: 0
        }
        UsersManager.#users.push(user);
        console.log("usuariocreado");
    }
    read(){
        return UsersManager.#users
    }
}
const gestorUsuarios = new UsersManager()
gestorUsuarios.create({
    photo: 'javapic.jpg',
    email: "valenreale123@gmail.com",
    password: "hola123",
})
gestorUsuarios.create({
    photo : 'javaimg.jpg',
    email: "santiagocalvoatlante@gmail.com",
    password: "hola1234",
})

console.log(gestorUsuarios.read() )
