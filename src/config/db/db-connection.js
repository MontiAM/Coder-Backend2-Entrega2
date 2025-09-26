import mongoose from "mongoose";
import { MONGO_URI } from "../config.js";

class MongoDBSingleton {
    constructor() {
        if (MongoDBSingleton.instance) {
            return MongoDBSingleton.instance;
        }

        this.url = MONGO_URI;
        this.isConnected = false;

        MongoDBSingleton.instance = this;
    }

    async connect() {
        if (this.isConnected) {
            console.log("Usando conexión existente a MongoDB");
            return;
        }
        try {
            await mongoose.connect(this.url);
            this.isConnected = true;
            console.log("Connected to database MongoDB Atlas");
        } catch (error) {
            console.log("Error connecting to the database MongoDB Atlas");
        }
    }

    getMongoose() {
        return mongoose;
    }
}

const mongoInstance = new MongoDBSingleton();
export default mongoInstance;
