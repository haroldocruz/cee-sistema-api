
import { IInstitution, Institution } from "./../../models/Institution";
import DB from "../../db/dbConnect";
import { Model } from "mongoose";

export default function (itemName: string): Model<IInstitution> {
    const itemSchema = new DB.Schema(Institution, { collection: itemName });
    return DB.model<IInstitution>(itemName, itemSchema, itemName);
}