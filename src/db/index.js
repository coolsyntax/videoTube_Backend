import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MongoDB_URL.replace("<DB_NAME>", DB_NAME)}`
        );
        console.log(
            `MongoDB connected : ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log(`\nMongoDB could not be connected : ${error}`);
        process.exit(1);
    }
};

export default connectDB;
