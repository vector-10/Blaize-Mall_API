const Order            = require('../models/orderModel');
const Product          = require('../models/productModel');
const ErrorHandler     = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');


// create new order => api/v3/order/new
const newOrder = catchAsyncErrors(async(req, res,next) => {
    const { 
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})



// get single order => /ap1/v3/order/:id
const getSingleOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order) {
        return next(new ErrorHandler('No order found with this ID ', 404))
        
    }

    res.status(200).json({
        success: true,
        order
    })
})


// get logged in user order => /ap1/v3/orders/me
const myOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.findById({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})


// get all orders => /ap1/v3/admin/orders
const getAllOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// update or process order- ADMIN => /ap1/v3/admin/order/:id
const updateOrder = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered' ) {
        return next(new ErrorHandler('You have already delivered this order', 404))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    await order.save( )

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}


// delete order => /ap1/v3/admin/order/:id
const deleteOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order) {
        return next(new ErrorHandler('No order found with this ID ', 404))
        
    }
    await order.remove()

    res.status(200).json({
        success: true        
    })
})



module.exports = {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder}