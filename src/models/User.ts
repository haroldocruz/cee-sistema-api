import { Document, Model, Schema } from "mongoose";
import { IContact } from './Contact';
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
    avatarUrl: string;
    photoUrl: string;
}

export interface ILoginInfo {
    'accessCount'?: Number;
    'lastDate'?: Date;
    'actualDate'?: Date;
    'ipClient'?: string;
    "_profileLogin"?: IProfile;
    "token"?: string;
    "providerId"?: string;
    "providerKey"?: string;
}

export interface IDataAccess {
    "username"?: string;
    "password": string;
    "passwordHash": string;
    "_profileDefault": IProfile;
    "_profileList"?: [IProfile];
}

export interface IUserBase {
    'status': boolean;
    "image"?: IUserImage;
    // 'status': string;
    'name': string;
    'cpf': string;
    // 'rg': IRg;
    'gender': string;
    'maritalStatus': string;
    'birthDate': Date;
    'contact': IContact;
    'dataAccess': IDataAccess;
    'loginInfo'?: ILoginInfo;
    'description': string;
    'metadata': Schema.Types.ObjectId;
}

export interface IUser extends IUserBase, Document { }
export interface IUser2 extends Model<Document> { }

export const User = {
    'status': { type: Boolean, default: false },
    "image": {
        avatarUrl: { type: String },
        photoUrl: { type: String }
    },
    // 'status': { type: String, default: "Inativo" },
    'name': { type: String },
    'cpf': { type: String },
    // 'rg': {
    //     'number': { type: Number },
    //     'expeditionDate': { type: Date },
    //     'dispatcherAgency': { type: String },
    //     'uf': String
    // },
    'gender': String,
    'maritalStatus': String,
    'birthDate': Date,
    'contact': {
        "emailList": [{
            "address": String,
            "description": String
        }],
        "phoneList": [{
            "number": Number,
            "description": String
        }],
        "addressList": [{
            "country": String,
            "state": String,
            "city": String,
            "district": String, //bairro
            "place": String, //logradouro
            "number": Number,
            "zipcode": Number,
            "complement": String,
            "description": String
        }]
    },
    'dataAccess': {
        'username': String,
        'password': { type: String, select: false },
        'passwordHash': { type: String, select: false }, //encrypted
        '_profileDefault': { type: Schema.Types.ObjectId, ref: "profile" },
        '_profileList': [{ type: Schema.Types.ObjectId, ref: "profile", select: false }],
    },
    'loginInfo': {
        'accessCount': { type: Number, default: 0 },
        'lastDate': Date,
        'actualDate': Date,
        'ipClient': String,
        'token': String,
        '_profileLogin': { type: Schema.Types.ObjectId, ref: "profile" },
        'providerId': String,
        'providerKey': String,
    },
    'description': String,

    'metadata': { type: Schema.Types.ObjectId, ref: 'metadata', select: false }
}


// export interface IUserBase {
//     'status': boolean;
//     'name': string;
//     'cpf': string;
//     'rg': IRg;
//     'contact': IContact;
//     'maritalStatus': string;
//     'gender': string;
//     'dataAccess': {
//         'username': string;
//         'password': string;
//         'passwordHash': string; //encrypted
//         'profiles': [string]; //encrypted
//         'profilesCrypt': string; //encrypted
//     };
//     'birthDate': string;
//     'address': [IAddress];
//     'loginInfo'?: {
//         'lastLoginDate'?: Date;
//         'token'?: string;
//         'providerId'?: string;
//         'providerKey'?: string;
//     }
//     'metadata': Schema.Types.ObjectId;
//     'email': [IEMail];
//     'phone': [IPhone];
// }