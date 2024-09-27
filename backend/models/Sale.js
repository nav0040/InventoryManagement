const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Inventory',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:false,
    },
    saleType:{
        type:String,
        enum:['Cash','Customer'],
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    totalPrice:{
        type:Number,
        required:true
    }
})


const Sale = mongoose.model('Sale',salesSchema);
module.exports = Sale;