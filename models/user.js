const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    category: { type: String, enum: ["student", "faculty", "other"], required: true },
    transactions: [
        {
            bookTitle: String,
            issueDate: Date,
            returnDate: Date,
            lateFee: Number
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
