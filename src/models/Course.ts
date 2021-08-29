import { Modality } from './enumerations/ModalityEnum';
import { IEvaluationResult } from './Evaluation';
import { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
    "name": string;
    "evaluationResult": IEvaluationResult;
    "modality": string;
    "description": string;
}

export const Course = {
    "name": { type: String },
    "evaluation": { type: Schema.Types.ObjectId, ref: "evaluation_result" },
    "modality": { type: String, enum: Object.values(Modality) },
    "description": { type: String }
}