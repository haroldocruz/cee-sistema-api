import { Document } from 'mongoose';
import { IMetadataBase, Metadata } from './Metadata';

export interface IAvaliadorBase {
    situation: string
    evaluatorName: string
    formationName: string
    description: string

    __metadata: IMetadataBase;
}

export interface IAvaliador extends IAvaliadorBase, Document { }

export const Avaliador = {

    situation: { type: String },
    evaluatorName: { type: String },
    formationName: { type: String },
    description: { type: String },

    __metadata: Metadata
}