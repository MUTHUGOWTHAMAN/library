const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const db = "mongodb+srv://muthugowthamanmca:muthugowthamanmca@cluster0.qv4u3.mongodb.net/library";
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected...");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
