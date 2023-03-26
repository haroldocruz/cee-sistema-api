import express, { NextFunction, Request, Response } from 'express';
import Auth, { IAuth } from '../../authServices';
import { IAvaliadorCtrl } from './controller';

var router = express.Router();

import controller from './controller';
import { IAvaliador } from '../../models/Avaliador';
import { IStatusMessage } from '../../utils/messages';

export default function (itemName: string) {
    var itemCtrl = controller(itemName);

    const ALLOWS = ['Administrador', 'Técnicos']

    // router.get('/', Auth.isAuthorized, fnGetAll(itemCtrl));
    router.get('/:id', fnGetOne(itemCtrl));
    router.post('/consultar', fnGetAll(itemCtrl));
    // router.get('/:id', Auth.isAuthorized, Auth.isPermitted(ALLOWS), fnGetOne(itemCtrl));
    router.post('/incluir', fnSave(itemCtrl));
    // router.post('/', Auth.isAuthorized, Auth.isPermitted(ALLOWS), fnSave(itemCtrl));
    router.put('/:id', Auth.isAuthorized, fnUpdate(itemCtrl));
    router.delete('/:id', fnRemove(itemCtrl));
    // router.delete('/:id', Auth.isAuthorized, fnRemove(itemCtrl));
    // router.post('/filter/', Auth.isAuthorized, fnAllFilter(itemCtrl));
    router.post('/counter/', fnCounter(itemCtrl));

    return router;
}

function fnGetOne(itemCtrl: IAvaliadorCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getOne(req, (resp: IAvaliador & IStatusMessage) => { res.json(resp) });
    };
}

function fnGetAll(itemCtrl: IAvaliadorCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getAll(req, (resp: IAvaliador[] & IStatusMessage) => { res.json(resp) });
    };
}

function fnSave(itemCtrl: IAvaliadorCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.save(req, (resp: IStatusMessage) => { res.json(resp) });
    };
}

function fnUpdate(itemCtrl: IAvaliadorCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.update(req, (resp: IAvaliador & IStatusMessage) => { res.json(resp) });
    };
}

function fnRemove(itemCtrl: IAvaliadorCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.remove(req, (resp: IStatusMessage) => { res.json(resp) });
    };
}

function fnCounter(itemCtrl: IAvaliadorCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.counter(req, (resp: number & IStatusMessage) => { res.json(resp); });
    };
}