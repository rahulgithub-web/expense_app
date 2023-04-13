const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log(`Server running on ${mongoose.connection.host}`.bgCyan.white);
    } catch(error) {
        console.log(`${error} `.bgRed)
    };
};

module.exports = connectDb;