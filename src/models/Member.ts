import { Document, Schema } from 'mongoose';
import { ContextEnum } from './enumerations/ContextEnum';
import { IInstitutionBase } from './Institution';
import { IProfileBase } from './Profile';
import { IUserBase } from './User';

export interface IMemberBase {
    status: boolean;
    context: string;
    _profile: string;
    profileName: string;
    _user: string;
    userName: string;
    _institution: string;
    institutionName: string;
}

export const Member = {
    status: { type: Boolean, default: false },
    context: { type: String, default: ContextEnum.UNINFORMED },
    _institution: { type: Schema.Types.ObjectId, ref: 'institution' },
    institutionName: { type: String },
    _profile: { type: Schema.Types.ObjectId, ref: 'profile' },
    profileName: { type: String },
    _user: { type: Schema.Types.ObjectId, ref: 'user' },
    userName: { type: String },
}