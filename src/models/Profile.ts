import { Document, Schema } from 'mongoose';
import { IGroup } from './Group';
import { IInstitutionBase } from './Institution';
import { IMaintained } from './Maintained';
import { IMaintainer } from './Maintainer';
import { IOrganSystem } from './OrganSystem';
import { IRoute } from './Route';
import { IUser } from './User';

export interface IProfileBase {
    "status": boolean;
    "name": string;
    "_routeList": IRoute[];
    "_userList": IUser[];
    "_institutionList": IInstitutionBase[];
    "context": string;
    "scope": IMaintainer & IMaintained & IOrganSystem;
    "group": IGroup;
    "description": string;
}

export interface IProfile extends IProfileBase, Document {}

export const Profile = {
    "status": { type: Boolean, default: false },
    "name": { type: String },
    "_routeList": [{ type: Schema.Types.ObjectId, ref: "route" }],
    "_userList": [{ type: Schema.Types.ObjectId, ref: "user" }],
    "_institutionList": [{ type: Schema.Types.ObjectId, ref: 'institution' }],
    "context": { type: String, enum: ['system', 'cee', 'seduc', 'dre', 'ie/ue', 'other', 'maintainer', 'maintained'] },
    // "context": { type: String, enum: Object.values(Context) },
    "scope": { type: Schema.Types.ObjectId, refPath: "context" },
    "group": { type: Schema.Types.ObjectId, ref: "group" },
    "description": { type: String }
}