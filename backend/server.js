import path from 'path'
import express from 'express'
import colors from 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from './routes/userRoutes.js';

dotenv.config()

connectDB()

const app = express()

app.use(cors())

// Body parser
app.use(express.json());
// app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)



// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin": *); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running on ${process.env.NODE_ENV} port ${PORT}`.yellow.bold))