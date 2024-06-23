const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    const { name, description, price, quantity } = req.body;
    try {
        const product = new Product({ name, description, price, quantity });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
