import { ICourse } from './Course';
import { IMaintained } from './Maintained';
import { IInstrument } from './Instrument';
import { ICommission } from './Commission';
import { Document, Schema } from 'mongoose';

export interface IEvaluationResult extends IEvaluationResultBase, Document {}
export interface IEvaluationResultBase {
    "concept": number;
    "date": Date;
    "commission": ICommission;
    "instrument": IInstrument;
    "maintained": IMaintained;
    "course": ICourse;
    "description": string;
}

export const EvaluationResult = {
    "concept": { type: Number },
    "date": { type: Date },
    "commission": { type: Schema.Types.ObjectId, ref: "commission" },
    "instrument": { type: Schema.Types.ObjectId, ref: "instrument" },
    "maintained": { type: Schema.Types.ObjectId, ref: "maintained" },
    "course": { type: Schema.Types.ObjectId, ref: "course" },
    "description": { type: String }
}