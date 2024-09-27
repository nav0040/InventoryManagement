const Customer = require("../models/Customer");
const Inventory = require("../models/Inventory");
const Sale = require("../models/Sale");


//Record sale
exports.createSale = async (req, res) => {
    try {

        const { itemId, quantity, customerId, saleType } = req.body;

        // check if item exists
        const item = await Inventory.findById(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });


        // check if sufficient quantity is available
        if (item.quantity < quantity) return res.status(400).json({
            message: 'Not enough stock available'
        });

        // if sale is for a customer, validate the customer
        let customer = null;

        if (saleType === 'Customer') {
            customer = await Customer.findById(customerId);
            if (!customer) return res.status(404).json({ error: 'Customer not found' });
        }

        const totalPrice = item.price * quantity;

        const newSale = new Sale({
            item: itemId,
            quantity,
            customer: customerId,
            saleType,
            totalPrice,
        });

        await newSale.save();

        // update the stock
        item.quantity = item.quantity - quantity;
        await item.save();

        res.status(201).json({
            message: 'Success',
            newSale
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Get Sales Report
exports.getSalesReport = async (req, res) => {
    try {
        const sales = await Sale.find().populate('item customer');
        res.status(200).json(sales)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Get Customer Ledger
exports.getCustomerLedger = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const sales = await Sale.find({ customer: customerId }).populate('item');
        if (!sales) return res.status(404).json({ message: 'No transactions found for this customer' });
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}