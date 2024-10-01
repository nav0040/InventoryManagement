const express = require('express');
const { createCustomer, getAllCustomers } = require('../controllers/customerController');
const router = express.Router();


router.post("/create",createCustomer);
router.get("/all",getAllCustomers);






module.exports = router;