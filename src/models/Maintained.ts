import { IOrganSystem } from './OrganSystem';
import { ICourse } from './Course';
import { IEvaluationResult } from './Evaluation';
import { IUser, IContact } from './User';
import { IMaintainer } from './Maintainer';
import { Document, Schema } from 'mongoose';

export interface IMaintained extends Document {
    "maintainer": IMaintainer;
    "name": string;
    "LegalAct": string;
    "contact": IContact;
    "dre": IOrganSystem;
    "evaluationResultList": IEvaluationResult[];
    "courseList": ICourse[];
    "memberList": IUser[];
    "description": string;
}

export const Maintained = {
    "maintainer": { type: Schema.Types.ObjectId, ref: "maintainer" },
    "name": { type: String },
    "LegalAct": { type: String },
    "contact": { type: Schema.Types.ObjectId, ref: "contact" },
    "dre": { type: Schema.Types.ObjectId, ref: "organ_system" },
    "evaluationResultList": { type: Schema.Types.ObjectId, ref: "evaluation_result" },
    "courseList": [{ type: Schema.Types.ObjectId, ref: "course" }],
    "memberList": [{ type: Schema.Types.ObjectId, ref: "user" }],
    "description": { type: String }
}