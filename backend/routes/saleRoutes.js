const express = require('express');
const { createSale, getSalesReport, getCustomerLedger } = require('../controllers/saleController');
const router = express.Router();

router.post('/create',createSale);
router.get('/report',getSalesReport);
router.get('/customer/:customerId',getCustomerLedger)


module.exports = router;
