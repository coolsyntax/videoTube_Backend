import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MongoDB_URL}/${DB_NAME}`
        );
        console.log(`MongoDB connected : ${connectionInstance}`);
    } catch (error) {
        console.log(`\nMongoDB could not be connected : ${error}`);
        process.exit(1);
    }
};

export default connectDB;
