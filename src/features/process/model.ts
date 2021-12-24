
import { IProcess, Process } from "./../../models/Process";
import DB from "../../db/dbConnect";
import { Model } from "mongoose";

export default function (itemName: string): Model<IProcess> {
    const itemSchema = new DB.Schema(Process, { collection: itemName });
    return DB.model<IProcess>(itemName, itemSchema, itemName);
}