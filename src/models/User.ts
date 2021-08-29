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

export interface ILoginInfo {
    'lastDate'?: Date;
    'actualDate'?: Date;
    'ipClient'?: string;
    "profileLogin"?: IProfile;
    "token"?: string;
    "providerId"?: string;
    "providerKey"?: string;
}

export interface IDataAccess {
    "username"?: string;
    "password": string;
    "passwordHash": string;
    "profileDefault": IProfile;
    "profileList"?: [IProfile];
}

export interface IUserBase {
    'status': boolean;
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
        'profileDefault': { type: Schema.Types.ObjectId, ref: "profile" },
        'profileList': [{ type: Schema.Types.ObjectId, ref: "profile", select: false }],
    },
    'loginInfo': {
        'lastDate': Date,
        'actualDate': Date,
        'ipClient': String,
        'token': String,
        'profileLogin': { type: Schema.Types.ObjectId, ref: "profile" },
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