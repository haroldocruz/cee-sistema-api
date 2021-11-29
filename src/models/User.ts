import { Document, Model, Schema } from "mongoose";
import { Contact, IContact } from './Contact';
import { IMetadataBase, Metadata } from "./Metadata";
import { IProfile } from './Profile';

export enum GenderEnum {
    MALE = "Masculino",
    FEMALE = "Feminino",
    UNINFORMED = "Não informado",
}

export enum MaritalStatusEnum {
    SINGLE = "Solteiro(a)",
    MARIED = "Casado(a)",
    DIVORCED = "Divorciado(a)",
    WIDOWER = "Viúvo(a)",
    UNINFORMED = "Não informado",
}

// export interface IRg {
//     "number": number;
//     "expeditionDate": Date;
//     "dispatcherAgency": string;
//     "uf": string;
// }

// export enum TypePhoneEnum {
//     CELULAR = "Celular",
//     RESIDENCIAL = "Residencial",
//     TRABALHO = "Trabalho",
//     RURAL = "Rural",
//     COMERCIAL = "Comercial",
//     RECADO = "Recado"
// }

export interface IUserImage {
    avatarUrl?: string;
    photoUrl?: string;
}

const UserImage = {
    avatarUrl: { type: String },
    photoUrl: { type: String }
}

export interface IBindInUser {
    status: boolean;
    context: string;
    _institution: string;
    institutionName: string;
    _profile: string;
    profileName: string;
}

const BindInUser = {
    status: Boolean,
    context: String,
    _institution: { type: Schema.Types.ObjectId, ref: "institution" },
    institutionName: String,
    _profile: { type: Schema.Types.ObjectId, ref: "profile" },
    profileName: String,
}

export interface ILoginInfo {
    'accessCount'?: Number;
    'lastDate'?: Date;
    'actualDate'?: Date;
    'ipClient'?: string;
    "currentBind"?: IBindInUser;
    // "_profileLogin"?: IProfile;
    "token"?: string;
    "providerId"?: string;
    "providerKey"?: string;
}

const LoginInfo = {
    'accessCount': { type: Number, default: 0 },
    'lastDate': Date,
    'actualDate': Date,
    'ipClient': String,
    'token': String,
    'currentBind': BindInUser,
    // '_profileLogin': { type: Schema.Types.ObjectId, ref: "profile" },
    'providerId': String,
    'providerKey': String,
}

export interface IDataAccess {
    "username"?: string;
    "password"?: string;
    "passwordHash"?: string;
    "bindDefault"?: IBindInUser;
    "bindList"?: IBindInUser[];
    // "_profileDefault"?: IProfile;
    // "_profileList"?: [IProfile];
}

const DataAccess = {
    'username': String,
    'password': { type: String, select: false },
    'passwordHash': { type: String, select: false }, //encrypted
    'bindDefault': BindInUser,
    'bindList': [BindInUser],
    // '_profileDefault': { type: Schema.Types.ObjectId, ref: "profile" },
    // '_profileList': [{ type: Schema.Types.ObjectId, ref: "profile", select: false }],
}

export interface IUserBase {
    'status': boolean;
    "image"?: IUserImage;
    'name': string;
    'cpf': string;
    'gender': string;
    'maritalStatus': string;
    'birthDate': Date;
    'contact': IContact;
    'dataAccess': IDataAccess;
    'loginInfo'?: ILoginInfo;
    'description': string;
    
    'metadata': IMetadataBase;
}

export interface IUser extends IUserBase, Document { }
export interface IUser2 extends Model<Document> { }

export const User = {
    'status': { type: Boolean, default: false },
    "image": UserImage,
    'name': { type: String },
    'cpf': { type: String },
    'gender': String,
    'maritalStatus': String,
    'birthDate': Date,
    'contact': Contact,
    'dataAccess': DataAccess,
    'loginInfo': LoginInfo,
    'description': String,

    '__metadata': Metadata
}