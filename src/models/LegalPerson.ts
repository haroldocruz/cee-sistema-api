import { Document, Schema } from 'mongoose';
import { Evidence, IEvidenceBase } from './Evidence';

export interface ILegalPersonBase {
    name: string;
    description: string;
    evidenceList: IEvidenceBase;
}

export interface ILegalPerson extends ILegalPersonBase, Document { }

export const LegalPerson = {
    "name": { type: String },
    "description": { type: String },
    "evidenceList": [Evidence]
}