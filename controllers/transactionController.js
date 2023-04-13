const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
  try {
    const { userid, frequency, selectedDate, type } = req.body;
    const transactions = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      ...(type !== "all" && { type }),
      userid,
    });
    return res.status(200).send(transactions);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const editTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;
    await transactionModel.findOneAndUpdate(
      { _id: transactionId },
      req.body.payload
    );
    return res.status(200).send('Edit Successfully')
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    return res.status(201).send("Transaction Created");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const deleteTransaction =async (req, res) => {
    try {
        const { transactionId } = req.body;
        await transactionModel.findOneAndDelete({ _id: transactionId })
        return res.status(200).send('Transaction deleted successfully!');
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = { getAllTransaction, editTransaction, addTransaction, deleteTransaction };
