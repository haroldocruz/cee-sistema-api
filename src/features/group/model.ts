
import { IGroup, Group } from "./../../models/Group";
import DB from "../../db/dbConnect";
import { Model } from "mongoose";

// export default function (itemName: string): Model<Document, {}> {
export default function (itemName: string): Model<IGroup> {
    const itemSchema = new DB.Schema(Group, { collection: itemName });
    return DB.model<IGroup>(itemName, itemSchema, itemName);
}