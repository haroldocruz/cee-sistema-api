import { Document, Schema } from 'mongoose';

export interface IMetadataBase {
    "_model"?: string;
    "modelName_"?: string;
    "_createdBy"?: string;
    "createdAt"?: Date;
    "_modifiedBy"?: string;
    "modifiedAt"?: Date;
    "_owner"?: string;
}

export interface IMetadata extends IMetadataBase, Document { }

export const Metadata = {
    "_model": String,
    "modelName_": String,
    "_createdBy": { type: Schema.Types.ObjectId, ref: 'user' },
    "createdAt": Date,
    "_modifiedBy": { type: Schema.Types.ObjectId, ref: 'user' },
    "modifiedAt": Date,
    "_owner": { type: Schema.Types.ObjectId, ref: 'user' },
}