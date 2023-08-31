const express = require('express');
const router  = express.Router();

const { 
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder

 } = require('../controllers/orderController.js');

const { authenticatedUser, authorizeRoles } = require('../middleware/auth')


 router.route('/order/new').post(authenticatedUser, newOrder);

 router.route('/order/:id').get(authenticatedUser, getSingleOrder);
 router.route('/orders/me').get(authenticatedUser, myOrders);

 router.route('/admin/orders/').get(authenticatedUser, getAllOrders);  
 router.route('/admin/orders/:id')
 .put(authenticatedUser, authorizeRoles('admin'), updateOrder)
 .delete(authenticatedUser, authorizeRoles('admin'), deleteOrder);







 module.exports = router;