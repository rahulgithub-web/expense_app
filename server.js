const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const user = require('./routes/userRoute');
const transaction = require('./routes/transactionRoutes');
const connectDb = require('./config/connectDb');
const path = require('path')

// config dot env file 
dotenv.config();

// database call  
connectDb();

// rest object 
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// routes 
//! user routes 
app.use('/api/v1/users', user);
//! transaction routes 
app.use('/api/v1/transactions', transaction);

// static routes
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

const PORT = 8080 || process.env.PORT;

// listen server 
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});