import { Document, Schema } from 'mongoose';

export interface ILegalActBase {
    name: string;
    title: string;
    description: string;
    url: string;
    type: string;
}

export interface ILegalAct extends ILegalActBase, Document { }

export const LegalAct = {
    "name": { type: String },
    "title": { type: String },
    "description": { type: String },
    "url": { type: String },
    "type": { type: String }
}