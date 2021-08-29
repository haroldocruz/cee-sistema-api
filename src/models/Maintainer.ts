import { ICourse } from './Course';
import { IOrganSystem } from './OrganSystem';
import { IUser, IContact } from './User';
import { Document, Schema } from 'mongoose';

export interface IMaintainer extends Document {
    "name": string;
    "LegalAct": string;
    "contact": IContact;
    "dre": IOrganSystem;
    "other": string;
    "courseList": ICourse[];
    "memberList": IUser[];
    "description": string;
}

export const Maintainer = {
    "name": { type: String },
    "LegalAct": { type: String },
    "contact": { type: Schema.Types.ObjectId, ref: "contact" },
    "dre": { type: Schema.Types.ObjectId, ref: "organ_system" },
    "courseList": [{ type: Schema.Types.ObjectId, ref: "course" }],
    "memberList": [{ type: Schema.Types.ObjectId, ref: "user" }],
    "description": { type: String }
}