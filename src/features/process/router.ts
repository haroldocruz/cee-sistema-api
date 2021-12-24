import express, { NextFunction, Request, Response} from 'express';
import Auth, { IAuth } from '../../authServices';
import { IProcessCtrl } from './controller';

var router = express.Router();

import controller from './controller';
import { IProcess } from '../../models/Process';
import { IStatusMessage } from '../../utils/messages';

export default function (itemName: string) {
    var itemCtrl = controller(itemName);

    const ALLOWS = ['Administrador', 'Técnicos']

    // router.get('/', Auth.isAuthorized, fnGetAll(itemCtrl));
    router.get('/', fnGetAll(itemCtrl));
    router.get('/:id', fnGetOne(itemCtrl));
    // router.get('/:id', Auth.isAuthorized, Auth.isPermitted(ALLOWS), fnGetOne(itemCtrl));
    router.post('/', fnSave(itemCtrl));
    // router.post('/', Auth.isAuthorized, Auth.isPermitted(ALLOWS), fnSave(itemCtrl));
    router.post('/bind', fnBind(itemCtrl));
    router.post('/unbind', fnUnbind(itemCtrl));
    router.put('/:id', Auth.isAuthorized, fnUpdate(itemCtrl));
    router.delete('/:id', fnRemove(itemCtrl));
    // router.delete('/:id', Auth.isAuthorized, fnRemove(itemCtrl));
    // router.post('/filter/', Auth.isAuthorized, fnAllFilter(itemCtrl));
    router.post('/counter/', fnCounter(itemCtrl));

    return router;
}

function fnGetOne(itemCtrl: IProcessCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getOne(req, (resp: IProcess & IStatusMessage) => { res.json(resp) });
    };
}

function fnGetAll(itemCtrl: IProcessCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getAll(req, (resp: IProcess[] & IStatusMessage) => { res.json(resp) });
    };
}

function fnSave(itemCtrl: IProcessCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.save(req, (resp: IStatusMessage) => { res.json(resp) });
    };
}

function fnBind(itemCtrl: IProcessCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.bindProcess(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnUnbind(itemCtrl: IProcessCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.unbindProcess(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnUpdate(itemCtrl: IProcessCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.update(req, (resp: IProcess & IStatusMessage) => { res.json(resp) });
    };
}

function fnRemove(itemCtrl: IProcessCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.remove(req, (resp: IStatusMessage) => { res.json(resp) });
    };
}

function fnCounter(itemCtrl: IProcessCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.counter(req, (resp: number & IStatusMessage) => { res.json(resp); });
    };
}