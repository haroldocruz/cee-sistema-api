import { IProfile } from './Profile';

export interface IToken {
    "actualDate": Date;
    "id": string;
    "ipClient": string;
    "profileLogin": IProfile;
    "profileList": string;
}