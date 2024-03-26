import express from "express"
import usersManager from "./fs/UsersManager.js";
import productsManager from "./fs/ProductsManager.js";

const server = express()
const port = 8080
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready)

server.use(express.urlencoded({ extended: true }))

server.get("/api/users", async (req, res) => {
    try {
        const { role } = req.query
        const all = await usersManager.read(role)
        console.log('All ', all);
        if (all.length !== 0) {
            return res.status(200).json({
                response: all,
                role,
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

server.get("/api/users/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const one = await usersManager.readOne(uid)
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

/* PRODUCTOS */
server.get("/api/products", async (req, res) => {
    try {
        const { category } = req.query
        console.log('cattt ', category);
        const all = await productsManager.read(category)
        console.log('All ', all);
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

server.get("/api/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const one = await productsManager.readOne(pid)
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
