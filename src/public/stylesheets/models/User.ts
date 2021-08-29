import { Document, Schema, Model } from "mongoose";
import { IProfile } from "./Profile";

export enum GenderEnum {
    FEMININO = "Feminino",
    MASCULINO = "Masculino",
    UNINFORMED = "Não informado",
}

export enum MaritalStatusEnum {
    SOLTEIRO = "Solteiro(a)",
    CASADO = "Casado(a)",
    DIVORCIADO = "Divorciado(a)",
    VIUVO = "Viúvo(a)",
}

export interface IRg {
    "number": number;
    "expeditionDate": Date;
    "dispatcherAgency": string;
    "uf": string;
}

export interface IContact {
    "email": string[];
    "phone": IPhone[];
    "address": IAddress[];
}

export interface IPhone {
    "number": number;
    "typePhone": TypePhoneEnum;
}

export enum TypePhoneEnum {
    CELULAR = "Celular",
    RESIDENCIAL = "Residencial",
    TRABALHO = "Trabalho",
    RURAL = "Rural",
    COMERCIAL = "Comercial",
    RECADO = "Recado"
}

export interface IAddress {
    "country": string;
    "state": string;
    "city": string;
    "district": string;
    "place": string;
    "number": number;
    "zipcode": number;
    "complement": string;
}

export interface ILoginInfo {
    "token": string;
    "providerId": string;
    "providerKey": string;
}

export interface IDataAccess {
    "username"?: string;
    "password": string;
    "profiles"?: IProfile[];
}

export interface IUserBase {
    'status': boolean;
    'name': string;
    'profiles': [string]; //encrypted
    'profilesHash': string; //encrypted
    'cpf': string;
    'rg': IRg;
    'contact': IContact;
    'maritalStatus': string;
    'gender': string;
    'dataAccess': {
        'username': string;
        'password': string;
        'passwordHash': string; //encrypted
    };
    'birthDate': string;
    'address': Schema.Types.ObjectId;
    'loginInfo': {
        'lastLoginDate': Date;
        'token': string;
        'providerId': string;
        'providerKey': string;
    }
    'metadata': Schema.Types.ObjectId;
    'email': string;
    'phone': [string];
}

export interface IUser extends IUserBase, Document { }
export interface IUser2 extends Model<Document> { }

export const User = {
    'status': { type: Boolean, default: false },
    'name': { type: String },
    'cpf': { type: String },
    'rg': {
        'number': { type: Number },
        'expeditionDate': { type: Date },
        'dispatcherAgency': { type: String },
        'uf': String
    },
    'contact': [{
        "email": String,
        "phone": {
            "number": Number,
            "typePhone": String
        },
        "address": {
            "country": String,
            "state": String,
            "city": String,
            "district": String,
            "place": String,
            "number": Number,
            "zipcode": Number,
            "complement": String
        }
    }],
    'maritalStatus': String,
    'gender': String,
    'dataAccess': {
        'username': String,
        'password': String, //encrypted
        'profiles': [{ type: Schema.Types.ObjectId, ref: "profile" }],
        'profilesHash': { type: String }, //encrypted
    },
    'birthDate': String,
    'loginInfo': {
        'lastDate': Date,
        'token': String,
        'providerId': String,
        'providerKey': String,
    },

    'metadata': { type: Schema.Types.ObjectId, ref: 'metadata' }
}