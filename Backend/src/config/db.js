import mongoose from 'mongoose';
import { DB_URL } from './config_env.js';

const uri = DB_URL;

let cached = global.mongoose || { conn: null, promise: null }

const getConnection = async () => {

    try {
        if (cached.conn) return cached.conn;

        if (!cached.promise) {
            cached.promise = mongoose.connect(uri, {
                bufferCommands: false,
                maxPoolSize: 10,
                minPoolSize: 1,
                socketTimeoutMS: 45000,
                serverSelectionTimeoutMS: 5000,
            });
        }
        cached.conn = await cached.promise;
        console.log("Successful connection to datebase")
        return cached.conn; 
    } catch (err) {
        console.error("Error connecting to database: " + err)
        cached.conn = null;
        cached.promise = null;
        throw err; 
    }
}

export default getConnection