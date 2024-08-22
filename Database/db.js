
import mongoose from "mongoose"

// require('dotenv').config({ path: '.env' });
// import dotenv from "dotenv"

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://mohamedabdelwahabelazab:V6ioVyLKwhvD03I6@cluster0.culje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Data is connected")

    } catch (error) {
        console.error("Data is not connected " + error);

    }
}

export default connectDB;
