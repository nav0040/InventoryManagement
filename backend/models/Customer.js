const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
      },
      address: {
        type: String,
        required: true,
      },
      mobileNumber: {
        type: String,
       
        required: [true, 'Mobile number is required'], 
        unique: [true, 'This mobile number is already in use'], 
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'] 
      },
},
{
    timestamps:true,
})


const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;