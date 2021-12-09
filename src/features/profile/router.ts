import express, { NextFunction, Request, Response} from 'express';
import Auth, { IAuth } from '../../authServices';
import { IProfileCtrl } from './controller';

var router = express.Router();

import controller from './controller';
import { IProfile } from '../../models/Profile';
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
    router.post('/bindingUser', fnBindingProfileUser(itemCtrl));
    router.post('/unbindingUser', fnUnBindingProfileUser(itemCtrl));
    router.post('/bindingInstitution', fnBindingProfileInstitution(itemCtrl));
    router.post('/unbindingInstitution', fnUnBindingProfileInstitution(itemCtrl));
    router.put('/:id', Auth.isAuthorized, fnUpdate(itemCtrl));
    router.delete('/:id', fnRemove(itemCtrl));
    // router.delete('/:id', Auth.isAuthorized, fnRemove(itemCtrl));
    router.post('/filter/', fnAllFilter(itemCtrl));
    // router.post('/filter/', Auth.isAuthorized, fnAllFilter(itemCtrl));
    router.post('/counter/', fnCounter(itemCtrl));

    return router;
}

function fnGetOne(itemCtrl: IProfileCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getOne(req, (resp: IProfile & IStatusMessage) => { res.json(resp) });
    };
}

function fnGetAll(itemCtrl: IProfileCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getAll(req, (resp: IProfile[] & IStatusMessage) => { res.json(resp) });
    };
}

function fnSave(itemCtrl: IProfileCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.save(req, (resp: IStatusMessage) => { res.json(resp) });
    };
}

function fnBindingProfileUser(itemCtrl: IProfileCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.bindingProfileUser(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnUnBindingProfileUser(itemCtrl: IProfileCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.unBindingProfileUser(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnBindingProfileInstitution(itemCtrl: IProfileCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.bindingProfileInstitution(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnUnBindingProfileInstitution(itemCtrl: IProfileCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.unBindingProfileInstitution(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnUpdate(itemCtrl: IProfileCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.update(req, (resp: IProfile & IStatusMessage) => { res.json(resp) });
    };
}

function fnRemove(itemCtrl: IProfileCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.remove(req, (resp: IStatusMessage) => { res.json(resp) });
    };
}

function fnAllFilter(itemCtrl: IProfileCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.allFilter(req, (resp: IProfile[] & IStatusMessage) => { res.json(resp) });
    };
}

function fnCounter(itemCtrl: IProfileCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.counter(req, (resp: number & IStatusMessage) => { res.json(resp); });
    };
}