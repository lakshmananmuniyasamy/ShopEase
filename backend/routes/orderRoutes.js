const express = require('express');
const { createOrder,confirmOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/create-order', createOrder);
router.post('/confirm-order',confirmOrder);

module.exports = router;
