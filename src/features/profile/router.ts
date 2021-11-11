import express, { NextFunction, Request, Response} from 'express';
import Auth, { IAuth } from '../../authServices';
import { IProfileCtrl } from './controller';

var router = express.Router();

import controller from './controller';
import { IProfile } from '../../models/Profile';
import { IMessage } from '../../messages';

export default function (itemName: string) {
    var itemCtrl = controller(itemName);

    const ALLOWS = ['Administrador', 'Técnicos']

    // router.get('/', Auth.isAuthorized, fnGetAll(itemCtrl));
    router.get('/', fnGetAll(itemCtrl));
    router.get('/:id', fnGetOne(itemCtrl));
    // router.get('/:id', Auth.isAuthorized, Auth.isPermitted(ALLOWS), fnGetOne(itemCtrl));
    router.post('/', fnSave(itemCtrl));
    // router.post('/', Auth.isAuthorized, Auth.isPermitted(ALLOWS), fnSave(itemCtrl));
    router.post('/binding', fnBindingProfileUser(itemCtrl));
    router.post('/unbinding', fnUnBindingProfileUser(itemCtrl));
    router.put('/:id', Auth.isAuthorized, fnUpdate(itemCtrl));
    router.delete('/:id', Auth.isAuthorized, fnRemove(itemCtrl));
    router.post('/filter/', fnAllFilter(itemCtrl));
    // router.post('/filter/', Auth.isAuthorized, fnAllFilter(itemCtrl));
    router.post('/counter/', fnCounter(itemCtrl));

    return router;
}

function fnGetOne(itemCtrl: IProfileCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getOne(req, (resp: IProfile & IMessage) => { res.json(resp) });
    };
}

function fnGetAll(itemCtrl: IProfileCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getAll(req, (resp: IProfile[] & IMessage) => { res.json(resp) });
    };
}

function fnSave(itemCtrl: IProfileCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.save(req, (resp: IMessage) => { res.json(resp) });
    };
}

function fnBindingProfileUser(itemCtrl: IProfileCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.bindingProfileUser(req, (resp: IMessage & any) => { res.json(resp) });
    };
}

function fnUnBindingProfileUser(itemCtrl: IProfileCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.unBindingProfileUser(req, (resp: IMessage & any) => { res.json(resp) });
    };
}

function fnUpdate(itemCtrl: IProfileCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.update(req, (resp: IProfile & IMessage) => { res.json(resp) });
    };
}

function fnRemove(itemCtrl: IProfileCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.remove(req, (resp: IMessage) => { res.json(resp) });
    };
}

function fnAllFilter(itemCtrl: IProfileCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.allFilter(req, (resp: IProfile[] & IMessage) => { res.json(resp) });
    };
}

function fnCounter(itemCtrl: IProfileCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.counter(req, (resp: number & IMessage) => { res.json(resp); });
    };
}