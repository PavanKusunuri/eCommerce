const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./config/db.js")
const colors = require('colors')

const productRoutes = require("./routes/productRoutes");

dotenv.config()

connectDB()

const app = express()

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send("API is running....");
})

app.get('/api/products/', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running on ${process.env.NODE_ENV} port ${PORT}`.yellow.bold))