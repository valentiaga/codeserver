import express from "express"
import usersManager from "./fs/UsersManager.js";
 

//server
const server = express()
//se crea el servidor
const port = 8080
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready)
//se inicie/levante el servidor

//middlewares
server.use(express.urlencoded({ extended: true }))
//obligo a mi servidor a usar la función encargada de leer parámetros/consultas
//permite leer req.params y req.query

//router
server.get("/", async (req, res) => {
    try {
        return res.status(200).json({
            response: "CODER API",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "CODER API ERROR",
            success: false
        })
    }
})

server.get("/api/users", async (req, res) => {
    try {
        const { category } = req.query
        const all = await usersManager.read(category)
        if (all.length !== 0) {
            return res.status(200).json({
                response: all,
                category,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})

//un parametro
server.get("/api/users/:nid", async (req, res) => {
    try {
        const { nid } = req.params
        const one = await usersManager.readOne(nid)
        if (one) {
            return res.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})
 
 //dos parámetros
server.get("/api/users/:text/:category", async (req, res) => {
    try {
        const { id, category } = req.params
        const data = { text, category }
        const one = await usersManager.create(data)
        return res.status(201).json({
            response: one,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "ERROR",
            success: false
        })
    }
})  