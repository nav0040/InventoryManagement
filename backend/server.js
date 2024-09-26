const dotenv  = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const customerRoute = require('./routes/customerRoute');


const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Route Middleware
app.use("/api/v1/users",userRoute);
app.use("/api/v1/customers",customerRoute);

const PORT = process.env.PORT || 5000;

// connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
        
    })
})
.catch((err)=> console.log(err))