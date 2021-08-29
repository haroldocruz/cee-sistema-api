import { Representation } from './enumerations/RepresentationEnum';
import { IUser } from './User';
import { IEvaluation } from './Evaluation';
import { Document, Schema } from 'mongoose';

export interface IMember {
    "user": IUser;
    "representation": string;
    "description": string;
}

export interface ICommission extends ICommissionBase, Document {}
export interface ICommissionBase {
    "member": IMember[];
    "evaluation": IEvaluation;
}

export const Commission = {
    "member": [{
        "user": { type: Schema.Types.ObjectId, ref: "user" },
        "representation": { type: String, enum: Object.values(Representation) },
        "description": { type: String }
    }],
    "evaluation": { type: Schema.Types.ObjectId, ref: "evaluation" }
}