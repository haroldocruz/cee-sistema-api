import express, { NextFunction, Request, Response} from 'express';
import Auth, { IAuth } from '../../authServices';
import { IInstitutionCtrl } from './controller';

var router = express.Router();

import controller from './controller';
import { IInstitution } from '../../models/Institution';
import { IStatusMessage } from '../../utils/messages';

export default function (itemName: string) {
    var itemCtrl = controller(itemName);

    const ALLOWS = ['Administrador', 'Técnicos']

    // router.get('/', Auth.isAuthorized, fnGetAll(itemCtrl));
    router.get('/', fnGetAll(itemCtrl));
    router.get('/:id', fnGetOne(itemCtrl));
    // router.get('/:id', Auth.isAuthorized, Auth.isPermitted(ALLOWS), fnGetOne(itemCtrl));
    router.post('/', fnSave(itemCtrl));
    router.post('/bindMember', fnBindMember(itemCtrl));
    router.post('/unbindMember', fnUnbindMember(itemCtrl));
    // router.post('/', Auth.isAuthorized, Auth.isPermitted(ALLOWS), fnSave(itemCtrl));
    // router.post('/bind', fnBindInstitutionUser(itemCtrl));
    router.put('/:id', Auth.isAuthorized, fnUpdate(itemCtrl));
    // router.put('/:id', fnUpdate(itemCtrl));
    router.delete('/:id', Auth.isAuthorized, fnRemove(itemCtrl));
    // router.post('/filterOne/', fnFilterOne(itemCtrl));
    router.post('/filterAll/', fnFilterAll(itemCtrl));
    // router.post('/filter/', Auth.isAuthorized, fnAllFilter(itemCtrl));
    router.post('/counter/', fnCounter(itemCtrl));

    return router;
}

function fnGetOne(itemCtrl: IInstitutionCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getOne(req, (resp: IInstitution & IStatusMessage) => { res.json(resp) });
    };
}

function fnGetAll(itemCtrl: IInstitutionCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.getAll(req, (resp: IInstitution[] & IStatusMessage) => { res.json(resp) });
    };
}

function fnSave(itemCtrl: IInstitutionCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.save(req, (resp: IStatusMessage) => { res.json(resp) });
    };
}

function fnBindMember(itemCtrl: IInstitutionCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.bindMember(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnUnbindMember(itemCtrl: IInstitutionCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.unbindMember(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnUpdate(itemCtrl: IInstitutionCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.update(req, (resp: IInstitution & IStatusMessage) => { res.json(resp) });
    };
}

function fnRemove(itemCtrl: IInstitutionCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.remove(req, (resp: IStatusMessage) => { res.json(resp) });
    };
}

function fnFilterAll(itemCtrl: IInstitutionCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.filterAll(req, (resp: IInstitution[] & IStatusMessage) => { res.json(resp) });
    };
}

function fnCounter(itemCtrl: IInstitutionCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.counter(req, (resp: number & IStatusMessage) => { res.json(resp); });
    };
}