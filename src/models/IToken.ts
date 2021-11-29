import { IBindInUser } from './User';

export interface IToken {
    "actualDate": Date;
    "id": string;
    "ipClient": string;
    "bindLogin": IBindInUser;
    "bindList": string;
    // "profileLogin": IProfile;
    // "profileList": string;
}