const express = require('express');
const { addTransaction, editTransaction, getAllTransaction, deleteTransaction } = require('../controllers/transactionController')


//router object
const router = express.Router();

// ---------------- Get All Transaction -----------------
router.post('/get-transaction', getAllTransaction);

// ---------------- Update Transaction -----------------
router.post('/edit-transaction', editTransaction);

// ---------------- Add Transaction -----------------
router.post('/add-transaction', addTransaction);

// ---------------- Delete Transaction -----------------
router.post('/delete-transaction', deleteTransaction);

module.exports = router;