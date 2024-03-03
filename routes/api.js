
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const db =
    "mongodb+srv://finapp:finapp1617@finapp.fixnkru.mongodb.net/?retryWrites=true&w=majority&appName=finapp";
mongoose.connect(db, (err) => {
    if (err) {
        console.log("Error !" + err);
    } else {
        console.log("connected to mongoDB");
    }
});

// Models
const Borrower = require("../Models/borrower");

// add borrower - POST

router.post("/addBorrower", (req, res) => {
    let borrower = new Borrower(req.body);
    borrower.save((error, borrower) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send({
                status: true,
                msg: "OK",
                borrower,
            });
        }
    });
});

// Get borrowers 

router.get("/borrowersList", (req, res) => {
    Borrower.find(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
        .sort({ createdDate: -1 });
});

// save transaction 

router.post("/saveTransaction", (req, res) => {
    Borrower.findByIdAndUpdate(
        req.body.userId,
        {
            $push: {
                transactions: {
                    dueDate: req.body.dueDate,
                    dueAmount: req.body.dueAmount
                }
            },
        },
        {
            new: true,
        },
        function (err, result) {
            if (err) {
                res.send("Error updating user");
            } else {
                res.status(200).send({
                    status: true,
                    msg: "OK!",
                    result,
                });
            }
        }
    );
});

// GET all transactions

router.post("/getLatestTransactions", (req, res) => {
    Borrower.find({ '_id': req.body._id }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }).sort({ dueDate: -1 });

});

// Delete borrower
router.post("/deleteBorrower", (req, res) => {
    Borrower.findByIdAndDelete({ '_id': req.body._id }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });

});

module.exports = router;
