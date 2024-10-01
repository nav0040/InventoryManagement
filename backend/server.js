const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const customerRoute = require('./routes/customerRoute');
const inventoryRoute = require('./routes/inventoryRoute');
const saleRoute = require('./routes/saleRoutes');
const exportRoute = require('./routes/exportRoutes');


const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));



// Route Middleware
app.use("/api/v1/users", userRoute);
app.use("/api/v1/customers", customerRoute);
app.use("/api/v1/inventory", inventoryRoute);
app.use("/api/v1/sale", saleRoute);
app.use("/api/v1/export", exportRoute);




const PORT = process.env.PORT || 5000;

// connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);

        })
    })
    .catch((err) => console.log(err))