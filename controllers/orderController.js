const Order = require('../models/order');
const Product = require('../models/product');

exports.createOrder = async (req, res) => {
    const { userId, products } = req.body;
    try {
        let total = 0;
        const productDetails = await Promise.all(products.map(async item => {
            const product = await Product.findById(item.product);
            total += product.price * item.quantity;
            return { product: product._id, quantity: item.quantity };
        }));

        const order = new Order({
            user: userId,
            products: productDetails,
            total,
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ user: userId }).populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
