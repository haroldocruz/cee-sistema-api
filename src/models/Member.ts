import { Document, Schema } from 'mongoose';
import { IProfileBase } from './Profile';
import { IUserBase } from './User';

export interface IMemberBase {
    status: boolean;
    _profile: IProfileBase;
    _user: IUserBase;
}

export interface IMember extends IMemberBase, Document { }

export const Member = {
    status: { type: Boolean, default: false },
    _profile: { type: Schema.Types.ObjectId, ref: 'profile' },
    _user: { type: Schema.Types.ObjectId, ref: 'user' }
}