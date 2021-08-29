// import { IProfile, obj } from "./IProfile";

// export default function (itemName: string): IProfile {
//     const DB = require('../../db/dbConnect');
//     const Schema = DB.Mongoose.Schema;
//     const ObjectId = Schema.Types.ObjectId;

//     // var itemObj = require('../' + itemName + '/object')(ObjectId);
//     var itemObj = obj;

//     var itemSchema = new Schema(itemObj, { collection: itemName });
//     var itemModel = DB.Mongoose.model(itemName, itemSchema, itemName);
    
//     return itemModel;
// }


import { IProfile, Profile } from "./../../models/Profile";
import DB from "../../db/dbConnect";
import { Model } from "mongoose";

// export default function (itemName: string): Model<Document, {}> {
export default function (itemName: string): Model<IProfile> {
    const itemSchema = new DB.Schema(Profile, { collection: itemName });
    return DB.model<IProfile>(itemName, itemSchema, itemName);
}