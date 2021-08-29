import { ICourse } from './Course';
import { IMaintained } from './Maintained';
import { IInstrument } from './Instrument';
import { ICommission } from './Commission';
import { Document, Schema } from 'mongoose';
import { EvaluationStatus, EvaluationType } from './enumerations/EvaluationEnum';

export interface IEvaluation extends IEvaluationBase, Document {}
export interface IEvaluationBase {
    "concept": number;
    "date": Date;
    "commission": ICommission;
    "instrument": IInstrument;
    "evaluationType": Enumerator<EvaluationStatus>;
    "evaluationStatus": string;
    "description": string;
}

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

export const Evaluation = {
    "concept": { type: Number },
    "date": { type: Date },
    "commission": { type: Schema.Types.ObjectId, ref: "commission" },
    "instrument": { type: Schema.Types.ObjectId, ref: "instrument" },
    "evaluationType": { type: String, enum: Object.values(EvaluationType) },
    "evaluationStatus": { type: String, enum: Object.values(EvaluationStatus) },
    "description": { type: String }
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