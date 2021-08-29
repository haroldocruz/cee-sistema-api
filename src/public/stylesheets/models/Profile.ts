import { Document, Schema } from 'mongoose';
import { ModelNameEnum } from './enumerations/ModelNameEnum';

export interface IProfile extends Document {
    "status": boolean;
    "name": string;
    "roleCrud"?: IRoleCrud[];
    "description": string;
}

interface IRoleCrud {
    "_modelName": ModelNameEnum;
    "_model": { type: Schema.Types.ObjectId, refPath: "_modelName" };
    "C"?: boolean;
    "R"?: boolean;
    "U"?: boolean;
    "D"?: boolean;
}

export const Profile = {
    "status": { type: Boolean, default: false},
    "name": { type: String },
    "description": { type: String }
}