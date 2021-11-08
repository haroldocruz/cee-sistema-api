import { Document, Schema } from 'mongoose';
import { Contact, IContactBase } from './Contact';
import { ICourse } from './Course';
import { IEvaluationResultBase } from './EvaluationResult';
import { ILegalActBase, LegalAct } from './LegalAct';
import { ILegalPersonBase, LegalPerson } from './LegalPerson';
import { IUser } from './User';
import { IMetadataBase, Metadata } from './Metadata';

export interface IFundaments {
    personalProfile?: String;
    mission?: String;
    vision?: String;
    values?: String;
}

export const Fundaments = {
    personalProfile: String,
    mission: String,
    vision: String,
    values: String,
}

export interface IInstitutionBase {
    status: Boolean;
    socialReason: String;
    cnpj: Number;
    name: String;
    initials: String;
    institutionType: String;
    administrativeSphere: String;
    description: String;
    fundaments: IFundaments;
    contact: IContactBase;

    legalPerson: ILegalPersonBase;
    legalActList: ILegalActBase[];
    evaluationResultList: IEvaluationResultBase[];
    // maintainer: IInstitutionBase;
    // courseList: ICourse[];
    // memberList: IUser[];

    __metadata: IMetadataBase;
}

export interface IInstitution extends IInstitutionBase, Document { }

export const Institution = {
    "status": { type: Boolean, default: false },
    "socialReason": { type: String },
    "cnpj": { type: Number },
    "name": { type: String },
    "initials": { type: String },
    "institutionType": { type: String },
    "administrativeSphere": { type: String },
    "description": { type: String },
    "fundaments": Fundaments,
    "contact": Contact,

    "legalPerson": LegalPerson,
    "legalActList": [LegalAct],
    // "maintainer": { type: String },
    // "evaluationResultList": { type: String },
    // "courseList": { type: String },

    "__metadata": Metadata
}