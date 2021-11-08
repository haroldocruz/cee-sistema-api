import { Document, Schema } from 'mongoose';

export interface IEvidenceBase {
    name: string;
    title: string;
    description: string;
    url: string;
    type: string;
}

export interface IEvidence extends IEvidenceBase, Document { }

export const Evidence = {
    "name": { type: String },
    "title": { type: String },
    "description": { type: String },
    "url": { type: String },
    "type": { type: String }
}