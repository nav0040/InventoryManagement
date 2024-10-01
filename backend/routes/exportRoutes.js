const express = require('express');
const { exportSalesTOExcel, exportSalesToPdf, emailSalesReport } = require('../controllers/exportController');
const router = express.Router();


router.get('/excel',exportSalesTOExcel)
router.get('/pdf',exportSalesToPdf)
router.post('/email',emailSalesReport)






module.exports = router