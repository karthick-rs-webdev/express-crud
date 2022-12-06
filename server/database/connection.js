const mongoose = require("mongoose");

// const connectDB = () => {
//     const url = `mongodb://localhost/${process.env.DB || 'user-management'}`;
//     mongoose.connect(url, { useNewUrlParser: true });
//     const connection = mongoose.connection;
//     connection.on("open", () => {
//         console.log(`connected to ${url}`);
//     });
// };

const connectDB = async() => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB connected to ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;



