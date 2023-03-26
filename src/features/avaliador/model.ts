
import { IAvaliador, Avaliador } from "./../../models/Avaliador";
import DB from "../../db/dbConnect";
import { Model } from "mongoose";

export default function (itemName: string): Model<IAvaliador> {
    const itemSchema = new DB.Schema(Avaliador, { collection: itemName });
    return DB.model<IAvaliador>(itemName, itemSchema, itemName);
}