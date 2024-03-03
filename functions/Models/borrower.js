const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const borrowerSchema = new Schema({
    borrowerName:String,
    borrowerNumber:String,
    loanAmount:Number,
    createdDate:String,
    transactions: [
        {
            dueDate: String,
            dueAmount: Number
        }
      ]
});

module.exports = mongoose.model('borrower', borrowerSchema, 'borrower');