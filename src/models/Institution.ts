import { Document, Schema } from 'mongoose';
import { Contact, IContactBase } from './Contact';
import { ICourse } from './Course';
import { IEvaluationResultBase } from './EvaluationResult';
import { ILegalActBase, LegalAct } from './LegalAct';
import { ILegalPersonBase, LegalPerson } from './LegalPerson';
import { IMetadataBase, Metadata } from './Metadata';
import { ContextEnum } from './enumerations/ContextEnum';

export interface IFundaments {
    personalProfile?: string;
    mission?: string;
    vision?: string;
    values?: string;
}

export const Fundaments = {
    personalProfile: String,
    mission: String,
    vision: String,
    values: String,
}

export interface IBindInInstitution {
    status: boolean;
    context: string;
    _profile: string;
    profileName: string;
    _user: string;
    userName: string;
}

export const BindInInstitution = {
    status: { type: Boolean, default: false },
    context: { type: String, default: ContextEnum.UNINFORMED },
    _profile: { type: Schema.Types.ObjectId, ref: 'profile' },
    profileName: { type: String },
    _user: { type: Schema.Types.ObjectId, ref: 'user' },
    userName: { type: String },
}

export interface IInstitutionBase {
    context?: string;
    status?: Boolean;
    socialReason?: string;
    cnpj?: Number;
    name?: string;
    initials?: string;
    institutionType?: string;
    administrativeSphere?: string;
    description?: string;
    fundaments?: IFundaments;
    contact?: IContactBase;

    legalPerson?: ILegalPersonBase;
    legalActList?: ILegalActBase[];
    evaluationResultList?: IEvaluationResultBase[];
    // maintainer?: IInstitutionBase;
    // courseList?: ICourse[];
    memberList?: IBindInInstitution[];

    // _profileList?: IProfileBase[];
    __metadata?: IMetadataBase;
}

export interface IInstitution extends IInstitutionBase, Document { }

export const Institution = {
    "context": { type: String, default: ContextEnum.UNINFORMED, enum: Object.values(ContextEnum) },
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
    "memberList": [BindInInstitution],

    // "_profileList": [{ type: Schema.Types.ObjectId, ref: 'profile' }],
    "__metadata": Metadata
}