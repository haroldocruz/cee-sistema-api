
import { IProfile, Profile } from "./../../models/Profile";
import DB from "../../db/dbConnect";
import { Model } from "mongoose";

export default function (itemName: string): Model<IProfile> {
    const itemSchema = new DB.Schema(Profile, { collection: itemName });
    return DB.model<IProfile>(itemName, itemSchema, itemName);
}