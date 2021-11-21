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
    router.post('/binding-member', fnBindingMember(itemCtrl));
    router.post('/unbinding-member', fnUnbindingMember(itemCtrl));
    // router.post('/', Auth.isAuthorized, Auth.isPermitted(ALLOWS), fnSave(itemCtrl));
    // router.post('/binding', fnBindingInstitutionUser(itemCtrl));
    router.put('/:id', Auth.isAuthorized, fnUpdate(itemCtrl));
    // router.put('/:id', fnUpdate(itemCtrl));
    router.delete('/:id', Auth.isAuthorized, fnRemove(itemCtrl));
    router.post('/filter/', fnAllFilter(itemCtrl));
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

function fnBindingMember(itemCtrl: IInstitutionCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.bindingMember(req, (resp: IStatusMessage & any) => { res.json(resp) });
    };
}

function fnUnbindingMember(itemCtrl: IInstitutionCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.unbindingMember(req, (resp: IStatusMessage & any) => { res.json(resp) });
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

function fnAllFilter(itemCtrl: IInstitutionCtrl) {
    return async (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.allFilter(req, (resp: IInstitution[] & IStatusMessage) => { res.json(resp) });
    };
}

function fnCounter(itemCtrl: IInstitutionCtrl) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        itemCtrl.counter(req, (resp: number & IStatusMessage) => { res.json(resp); });
    };
}