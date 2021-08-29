import { Document, Schema } from "mongoose";

export interface IProfile extends Document {
    "_id"?: string;
    "status": boolean;
    "name": string;
    "roleCrud"?: IRoleCrud[];
    "description"?: string;
}

export const Profile = {
    '_indicator': [{ type: Schema.Types.ObjectId, ref: 'indicator' }],

    'act': { type: String },
    'description': { type: String },

    'metadata': { type: Schema.Types.ObjectId, ref: 'metadata' }
}

interface IRoleCrud {
    "_model": string; //ObjectId
    "_modelName": string; //collection name
    "C": boolean;
    "R": boolean;
    "U": boolean;
    "D": boolean;
}