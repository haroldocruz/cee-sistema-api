import { Document, Schema } from 'mongoose';
import { ContextEnum } from './enumerations/ContextEnum';
import { IGroup } from './Group';
import { IInstitutionBase } from './Institution';
import { IMaintained } from './Maintained';
import { IMaintainer } from './Maintainer';
import { IMetadataBase, Metadata } from './Metadata';
import { IOrganSystem } from './OrganSystem';
import { IRoute } from './Route';
import { IUser } from './User';

export interface IProfileBase {
    "status": boolean;
    "name": string;
    "context": string;
    "description": string;

    "_routeList": IRoute[];
    // "_userList": IUser[];
    // "_institutionList": IInstitutionBase[];
    // "scope": IMaintainer & IMaintained & IOrganSystem;
    // "group": IGroup;

    __metadata: IMetadataBase;
}

export interface IProfile extends IProfileBase, Document {}

export const Profile = {
    "status": { type: Boolean, default: false },
    "name": { type: String },
    "context": { type: String, enum: Object.values(ContextEnum) },
    "description": { type: String },
    
    "_routeList": [{ type: Schema.Types.ObjectId, ref: "route" }],
    // "_userList": [{ type: Schema.Types.ObjectId, ref: "user" }],
    // "_institutionList": [{ type: Schema.Types.ObjectId, ref: 'institution' }],
    // "context": { type: String, enum: Object.values(Context) },
    // "scope": { type: Schema.Types.ObjectId, refPath: "context" },
    // "group": { type: Schema.Types.ObjectId, ref: "group" },
    
    __metadata: Metadata
}