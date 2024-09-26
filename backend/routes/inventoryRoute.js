const express = require('express');
const { createInventory, getAllItems, updateItem, deleteItem } = require('../controllers/inventoryController');
const router = express.Router();


router.post("/create",createInventory);
router.get("/all",getAllItems);
router.put("/update/:id",updateItem);
router.delete("/delete/:id",deleteItem);





module.exports = router;