import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set("strict", true);

    if (isConnected) {
        console.log("Mongoose Connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'promptopia',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("Mongoose Connected");
    } catch (e) {
        console.log(e);
    }
};