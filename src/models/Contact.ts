import { Document } from "mongoose";

export interface IContactBase {
    "emailList"?: [IEMail];
    "phoneList"?: [IPhone];
    "addressList"?: [IAddress];
}

export interface IPhone {
    "number"?: number;
    "description"?: string;
    // "typePhone": TypePhoneEnum;
}

export interface IEMail {
    "address"?: string;
    "description"?: string;
}

export interface IAddress {
    "country"?: string;
    "state"?: string;
    "city"?: string;
    "district"?: string;
    "place"?: string;
    "number"?: number;
    "zipcode"?: number;
    "complement"?: string;
    "description"?: string;
}

export interface IContact extends IContactBase, Document { }

export const Contact = {
    "emailList": [{
        "address": { type: String },
        "description": { type: String }
    }],
    "phoneList": [{
        "number": { type: Number },
        "description": { type: String }
        // "typePhone": TypePhoneEnum;
    }],
    "addressList": [{
        "country": String,
        "state": String,
        "city": String,
        "district": String,
        "place": String,
        "number": Number,
        "zipcode": Number,
        "complement": String,
        "description": String,
    }]
}