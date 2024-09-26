const Customer = require("../models/Customer");



exports.createCustomer = async (req, res) => {
    try {
        const { name, address, mobileNumber } = req.body;

        if (!name || !address || !mobileNumber) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const customer = new Customer({ name, address, mobileNumber });

        await customer.save();
        res.status(201).json({ message: 'Customer added successfully!' });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Customer name or mobile number already exists!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}


// Get all customers
exports.getAllCustomers = async(req,res)=>{
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}