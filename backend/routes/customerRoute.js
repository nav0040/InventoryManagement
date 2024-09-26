const express = require('express');
const { createCustomer, getAllCustomers } = require('../controllers/customerController');
const router = express.Router();


router.post("/create",createCustomer);
router.post("/all",getAllCustomers);






module.exports = router;