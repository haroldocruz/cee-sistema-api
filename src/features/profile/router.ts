import express, { NextFunction, Request, Response, Router} from 'express';
import Auth, { IAuth } from '../../authServices';
import { IInstrumentCtrl } from './controller';

var router = express.Router();

import controller from './controller';
import { IInstrument } from '../instrument/IInstrument';
// var metadata = require('../metadata/metadataCtrl')

// module.exports = function (itemName: string, obj: Object) {
export default function (itemName: string) {
    var itemCtrl = controller(itemName);

    const ALLOWS = ['Administrador', 'Técnicos']

    // router.get('/', Auth.isAuthorized, fnGetAll(itemCtrl));
    router.get('/', fnGetAll(itemCtrl));
    router.get('/:id', fnGetOne(itemCtrl));
    // router.get('/:id', Auth.isAuthorized, Auth.isPermitted(ALLOWS), fnGetOne(itemCtrl));
    router.post('/', fnSave(itemCtrl));
    // router.post('/', Auth.isAuthorized, Auth.isPermitted(ALLOWS), fnSave(itemCtrl));
    router.put('/:id', Auth.isAuthorized, fnUpdate(itemCtrl));
    router.delete('/:id', Auth.isAuthorized, fnRemove(itemCtrl));
    router.post('/filter/', Auth.isAuthorized, fnAllFilter(itemCtrl));
    router.post('/counter/', fnCounter(itemCtrl));

    return router;
}

function fnGetOne(itemCtrl: IInstrumentCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getOne(req, (resp: IInstrument) => { res.json(resp) });
    };
}

function fnGetAll(itemCtrl: IInstrumentCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getAll(req, (resp: IInstrument) => { res.json(resp) });
    };
}

function fnSave(itemCtrl: IInstrumentCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.save(req, (resp: IInstrument) => { res.json(resp) });
    };
}

function fnUpdate(itemCtrl: IInstrumentCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.update(req, (resp: IInstrument) => { res.json(resp) });
    };
}

function fnRemove(itemCtrl: IInstrumentCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.remove(req, (resp: IInstrument) => { res.json(resp) });
    };
}

function fnAllFilter(itemCtrl: IInstrumentCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.allFilter(req, (resp: IInstrument) => { res.json(resp) });
    };
}

function fnCounter(itemCtrl: IInstrumentCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.counter(req, (resp: IInstrument) => { res.json(resp); });
    };
}