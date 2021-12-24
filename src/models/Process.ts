import { Document, Schema } from 'mongoose';
import { SituationEnum } from './enumerations/SituationEnum';
import { Evidence, IEvidenceBase } from './Evidence';
import { IInstitutionBase } from './Institution';
import { IMetadataBase, Metadata } from './Metadata';

interface ISgd {
    "number": string;
    "autuationDate": Date;
}

export interface IProcessBase {
    "status": boolean;
    "situation": string;
    "_interestedList": IInstitutionBase[];
    "_dreje": IInstitutionBase;
    "act": string;
    "description": string;
    "sgd": ISgd;
    "documentList": IEvidenceBase[];

    __metadata: IMetadataBase;
}

export interface IProcess extends IProcessBase, Document { }

export const Process = {
    status: { type: Boolean, default: false },
    situation: { type: String, enum: Object.values(SituationEnum) },
    _interestedList: [{ type: Schema.Types.ObjectId, ref: "institution", name: String }],
    _dreje: { type: Schema.Types.ObjectId, ref: "institution", name: String },
    description: { type: String },
    sgd: {
        number: { type: Number },
        autuationDate: { type: Date }
    },
    _documentList: [Evidence],

    __metadata: Metadata
}