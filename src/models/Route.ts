import { Context } from './enumerations/ContextEnum';
import { Document } from 'mongoose';

export interface IRouteDocument extends IRoute, Document {}
export interface IRoute {
    "status"?: boolean;
    "urn": string;
    // "context": string;
    "description"?: string;
}

export const Route = {
    "status": { type: Boolean, default: false},
    // "context": { type: String, enum: ['organ_system', 'maintainer', 'maintained'] },
    // "context": { type: String, enum: Object.values(Context) },
    "urn": { type: String },
    "description": { type: String }
}