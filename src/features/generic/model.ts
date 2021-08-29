
import { Document, Model } from "mongoose";
import DB from "../../db/dbConnect";

export default function (itemName: string, obj: {}): Model<Document> {
    const itemSchema = new DB.Schema(obj, { collection: itemName });
    return DB.model<Document>(itemName, itemSchema, itemName);
}