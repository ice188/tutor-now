const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/routes/user.route');
const errorHandler = require('./src/middlewares/errorHandler');

app.use(express.json()); 
app.use(cors({
    origin: process.env.CORS_ORIGIN.split(","), 
    credentials: true, 
}));

app.use('/api/user', userRoutes);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
}

module.exports = app;
