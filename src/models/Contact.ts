
export interface IContact {
    "emailList": [IEMail];
    "phoneList": [IPhone];
    "addressList": [IAddress];
}

export interface IPhone {
    "number": number;
    "description": string;
    // "typePhone": TypePhoneEnum;
}

export interface IEMail {
    "address": string;
    "description": string;
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
    "description": string;
}
