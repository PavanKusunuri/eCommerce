import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//  @desc  Fetch all products
//  @route GET /api/products
//  @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

//  @description Fetch Single Product
//  @route           GET/api/products/:id
//  @access         Public

const getProductById = asyncHandler(async (req, res) => {
    const produt = await Product.findById(req.params.id)
    if (produt) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not Found!!')
    }
})

export {
    getProductById, getProducts
}