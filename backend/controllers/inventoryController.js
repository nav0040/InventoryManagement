const Inventory = require("../models/Inventory");

exports.createInventory = async (req, res) => {
    try {
        const { name, description, quantity, price } = req.body;

        if (!name || !description || !quantity || !price) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const inventory = new Inventory({
            name,
            description,
            quantity,
            price
        });

        await inventory.save();

        res.status(201).json({ message: 'Item added successfully!' });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Item name already exists!' });
        } else {
            res.status(500).json({ message: 'Error adding item' });
        }
    }
}

// Get all items or search items
exports.getAllItems = async(req,res)=>{
    try {
        const { search } = req.query;
        const query = search ? { $or:[{ name: new RegExp(search,'i')},{ description : new RegExp(search,'i')}]} : {};

        const items = await Inventory.find(query);
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Update item

exports.updateItem = async(req,res)=>{
    try {
        
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updatedItem);

    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Item name already exists!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// Delete item

exports.deleteItem = async(req,res)=>{
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}