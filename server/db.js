import mongoose from "mongoose";
import { MONGODB_URI } from "./cofig.js";

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const db = await mongoose.connect(MONGODB_URI);
        console.log('conectado a la db ', db.connection.name);
    } catch (error) {
        console.log('conexion fallida en db.js linea 5', error);
    }
}