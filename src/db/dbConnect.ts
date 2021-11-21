import mongoose, { ConnectOptions } from "mongoose";
import { URI } from "./environment";

const connectOptions: ConnectOptions = {};

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

mongoose.connect( URI, connectOptions);

export default mongoose;
