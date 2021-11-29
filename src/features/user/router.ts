import express, { NextFunction, Request, Response } from 'express';
import { IAuth } from '../../authServices';
import { IUserBase } from './../../models/User';
import controller, { IUserCtrl } from './controller';

var router = express.Router();

export default function (itemName: string) {
    var itemCtrl = controller(itemName);

    //const model('group').find({"role": {$in: []}})

    const ALLOWS = ['SuperUser', 'Administrador', 'Técnicos']

    router.get('/', fnGetAll(itemCtrl));
    router.get('/:id', fnGetOne(itemCtrl));
    router.post('/', fnSave(itemCtrl));
    router.put('/:id', fnUpdate(itemCtrl));
    router.delete('/:id', fnRemove(itemCtrl));
    router.post('/filterOne/', fnFilterOne(itemCtrl));
    router.post('/filterAll/', fnFilterAll(itemCtrl));
    router.post('/counter/', fnCounter(itemCtrl));
    // router.get('/', Auth.isAuthorized, Auth.guard(), fnGetAll(itemCtrl));
    // router.get('/:id', Auth.isAuthorized, Auth.guard(), fnGetOne(itemCtrl));
    // router.post('/', Auth.isAuthorized, Auth.guard(), fnSave(itemCtrl));
    // router.put('/:id', Auth.isAuthorized, Auth.guard(), fnUpdate(itemCtrl));
    // router.delete('/:id', Auth.isAuthorized, Auth.guard(), fnRemove(itemCtrl));
    // router.post('/filter/', Auth.isAuthorized, Auth.guard(), fnAllFilter(itemCtrl));
    // router.post('/counter/', Auth.isAuthorized, Auth.guard(), fnCounter(itemCtrl));

    return router;
}

function fnGetOne(itemCtrl: IUserCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getOne(req, (resp: IUserBase) => { res.json(resp) });
    };
}

function fnGetAll(itemCtrl: IUserCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getAll(req, (resp: IUserBase) => { res.json(resp) });
    };
}

function fnSave(itemCtrl: IUserCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.save(req, (resp: IUserBase) => { res.json(resp) });
    };
}

function fnUpdate(itemCtrl: IUserCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.update(req, (resp: IUserBase) => { res.json(resp) });
    };
}

function fnRemove(itemCtrl: IUserCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.remove(req, (resp: IUserBase) => { res.json(resp) });
    };
}

function fnFilterOne(itemCtrl: IUserCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.filterOne(req, (resp: IUserBase) => { res.json(resp) });
    };
}

function fnFilterAll(itemCtrl: IUserCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.filterAll(req, (resp: IUserBase) => { res.json(resp) });
    };
}

function fnCounter(itemCtrl: IUserCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.counter(req, (resp: IUserBase) => { res.json(resp); });
    };
}