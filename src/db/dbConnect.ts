import mongoose, { ConnectionOptions } from "mongoose";
import { URI } from "./environment";

const connectionOptions: ConnectionOptions = {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
};

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

mongoose.connect( URI, connectionOptions);

export default mongoose;
