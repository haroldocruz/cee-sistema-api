import { Context } from './enumerations/ContextEnum';
import { Document } from 'mongoose';

export interface IGroup extends IGroupBase, Document {}
export interface IGroupBase {
    "name": string;
    "description": string;
}

export const Group = {
    "name": { type: String },
    "context": { type: String, enum: Object.values(Context) },
    "description": { type: String }
}