import express from "express"
import { pool } from "./db.js"

const port = 3000 || process.env.PORT

const app = express()
app.use(express.json())

// routes
app.get('/', async (req,res) => {
    try {
        const users = await pool.query('SELECT * FROM users')
        res.status(200).send({
            users: users.rows
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

app.get('/register/:name/:age/:location', async (req,res) => {
    const { name, age, location } = req.params
    try {
        await pool.query('INSERT INTO users (name, age, address) VALUES ($1, $2, $3)', [name, age, location])
        res.status(200).send({
            message: "Successfully user added",
            user: `My name is ${name} and i lived in ${location} and i am ${age} year old.`
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

app.get('/setup', async (req,res) => {
    try {
        await pool.query('CREATE TABLE users( id SERIAL PRIMARY KEY, name VARCHAR(200), age VARCHAR(200), address VARCHAR(200))')
        res.status(200).send({
            message: "Successfully added table"
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))