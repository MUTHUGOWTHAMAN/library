const mongoose = require("mongoose");

const lateFeeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    overdueDays: {
        type: Number,
        required: true
    },
    feePerDay: {
        type: Number,
        required: true
    },
    totalFee: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const LateFee = mongoose.model("LateFee", lateFeeSchema);
module.exports = LateFee;
