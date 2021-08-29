import { IContact } from './Contact';
import { IUser } from './User';
import { Document, Schema } from 'mongoose';

export interface IOrganSystem extends Document {
    "name": string;
    "LegalAct": string;
    "contact": IContact;
    "memberList": IUser[];
    "description": string;
}

export const OrganSystem = {
    "name": { type: String },
    "LegalAct": { type: String },
    "contact": { type: Schema.Types.ObjectId, ref: "contact" },
    "memberList": [{ type: Schema.Types.ObjectId, ref: "user" }],
    "description": { type: String }
}