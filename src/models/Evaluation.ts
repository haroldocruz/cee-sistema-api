import { IInstrument } from './Instrument';
import { ICommission } from './Commission';
import { Document, Schema } from 'mongoose';
import { EvaluationStatusEnum, EvaluationTypeEnum } from './enumerations/EvaluationEnum';

export interface IEvaluation extends IEvaluationBase, Document {}
export interface IEvaluationBase {
    "concept": number;
    "date": Date;
    "commission": ICommission;
    "instrument": IInstrument;
    "evaluationType": Enumerator<EvaluationStatusEnum>;
    "evaluationStatus": string;
    "description": string;
}

export const Evaluation = {
    "concept": { type: Number },
    "date": { type: Date },
    "commission": { type: Schema.Types.ObjectId, ref: "commission" },
    "instrument": { type: Schema.Types.ObjectId, ref: "instrument" },
    "evaluationType": { type: String, enum: Object.values(EvaluationTypeEnum) },
    "evaluationStatus": { type: String, enum: Object.values(EvaluationStatusEnum) },
    "description": { type: String }
}