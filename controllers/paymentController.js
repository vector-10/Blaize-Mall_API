// const catchAsyncErrors = require('../middleware/catchAsyncErrors');
// const stripe           = require('stripe')(process.env.STRIPE_SECRET_KEY);

// // Process stripe payments => api/v3/payment/process

// const processPayment = catchAsyncErrors(async(req, res, next) => {

//     const payment = await stripe.paymentIntents.create({
//         amount: req.body.amount,
//         currency: 'usd',

//         metadata: { integration_check: 'accept_a_payment' }

//     });

//     res.status(200).json({
//         success: true,
//         clientSecret: payment.client_secret
//     })
// });

// // ssend stripe API key => /api/v3/stripeapi
// const sendStripeApi = catchAsyncErrors(async(req, res, next)=> {
//     res.status(200).json({
//        stripeApiKey: process.env.STRIPE_API_KEY
//     })
// })

// module.exports = {
//     processPayment,
//     sendStripeApi
// }