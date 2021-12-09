import express, { NextFunction, Request, Response } from 'express';
import { IAuth } from '../../authServices';
import { IStatusMessage } from '../../utils/messages';
import controller from './controller';

var router = express.Router();

export default function (itemName: string, obj: {}) {
    var itemCtrl = controller(itemName, obj);

    const ALLOWS = ['SuperUser', 'Administrador', 'Técnicos']

    router.post('/login', fnLogin(itemCtrl));
    router.get('/', fnGetAll(itemCtrl));
    router.get('/:id', fnGetOne(itemCtrl));
    router.post('/', fnSave(itemCtrl));
    // router.get('/:id', Auth.isAuthorized, fnGetOne(itemCtrl));
    // router.post('/', Auth.isAuthorized, fnSave(itemCtrl));
    // router.put('/:id', Auth.isAuthorized, fnUpdate(itemCtrl));
    // router.delete('/:id', Auth.isAuthorized, fnRemove(itemCtrl));
    // router.post('/filter/', Auth.isAuthorized, fnAllFilter(itemCtrl));
    // router.post('/counter/', fnCounter(itemCtrl));
    router.put('/:id', fnUpdate(itemCtrl));
    router.delete('/:id', fnRemove(itemCtrl));
    router.post('/filter/', fnAllFilter(itemCtrl));
    router.post('/counter/', fnCounter(itemCtrl));

    return router;
}

function fnLogin(itemCtrl: any) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.login(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnGetOne(itemCtrl: any) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getOne(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnGetAll(itemCtrl: any) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getAll(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnSave(itemCtrl: any) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.save(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnUpdate(itemCtrl: any) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.update(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnRemove(itemCtrl: any) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.remove(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnAllFilter(itemCtrl: any) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.allFilter(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnCounter(itemCtrl: any) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.counter(req, (resp: IStatusMessage & any) => { res.json(resp); });
    };
}