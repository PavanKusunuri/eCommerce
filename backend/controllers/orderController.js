import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    console.log(req.user._id)

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//  @desc Get Order by Id
//  @route /api/orders/:id
//  @access private

const getOrderById = asyncHandler(async (req, res) => {
    const order = await (await Order.findById(req.params.id)).populate('user', 'name', 'email')

    if (order) {
        res.json(order)
    } else {
        throw new Error('Order not found ..')
    }
})


//  @desc Update order to paid
//  @route /api/orders/:id/pay
//  @access private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    console.log("Contoller method ic ")
    const order = await (await Order.findById(req.params.id))

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_item,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json = updatedOrder
    } else {
        throw new Error('Order not found ..')
    }
})



//  @desc Get logged in user orders
//  @route /api/orders/myorders
//  @access private

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await (await Order.find(user))
    res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }