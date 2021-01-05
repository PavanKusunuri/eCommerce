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
    console.log(req.params.id)
    const produt = await Product.findById(req.params.id)
    console.log(produt)
    if (produt) {
        res.json(produt)
    } else {
        res.status(404)
        throw new Error('Product not Found!!')
    }
})

//  @description  DELETE a product
//  @route           DELETE /api/products/:id
//  @access         Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product Removed' })
    } else {
        res.status(404)
        throw new Error('Product not Found!!')
    }
})

//  @description   Create a product
//  @route             POST /api/products
//  @access            Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

})

export {
    getProductById, getProducts, deleteProduct
}