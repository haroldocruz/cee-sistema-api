import { Document, Schema } from "mongoose";

export interface IInstrument extends Document {
    '_indicator': Schema.Types.ObjectId;
    'act': string;
    'description': string;
    'metadata': Schema.Types.ObjectId;
}

export const Instrument = {
    '_indicator': [{ type: Schema.Types.ObjectId, ref: 'indicator' }],

    'act': { type: String },
    'description': { type: String },

    'metadata': { type: Schema.Types.ObjectId, ref: 'metadata' }
}