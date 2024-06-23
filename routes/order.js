const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/', createOrder);
router.get('/user/:userId', getUserOrders);

module.exports = router;