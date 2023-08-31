const Product   = require('../models/productModel');
const connectDB = require('../database.js/connect');
const products  = require('../Data/products.json');
require('dotenv').config();

connectDB();

const seedProducts = async() => {
    try {
        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products);
        console.log('All products are added');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
        
    }
}

seedProducts();