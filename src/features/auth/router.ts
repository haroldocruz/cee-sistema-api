import express, { NextFunction, Request, Response } from 'express';
import Auth, { IAuth } from './../../authServices';
import { IUser } from './../../models/User';
import controller, { IAuthCtrl } from './controller';

var router = express.Router();

export default function (itemName: string) {
    var itemCtrl: IAuthCtrl = controller();

    router.post('/login', fnLogIn(itemCtrl['login']));
    router.post('/logout/:id', Auth.isAuthorized, fnHandler(itemCtrl['logout']));
    router.post('/logon/:id', Auth.isAuthorized, fnLogOn(itemCtrl['logon']));
    router.post('/logoff/:id', Auth.isAuthorized, fnLogOff(itemCtrl['logoff']));

    return router;
}

function response(res: Response): Function {
    return (data: IUser | Array<any>) => { 
        // if(typeof data[0] === "boolean")
        res.status(200).json(data)
    }
}

function fnHandler(handle: Function) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        handle(req, response(res));
    };
}

function fnLogIn(login: IAuthCtrl['login']) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        login(req, response(res));
    };
}

function fnLogOut(logout: IAuthCtrl['logout']) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        logout(req, (resp: IUser) => { res.json(resp) });
    };
}

function fnLogOn(logon: IAuthCtrl['logon']) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        logon(req, (resp: IUser) => { res.json(resp) });
    };
}

function fnLogOff(logoff: IAuthCtrl['logoff']) {
    return (req: Request & IAuth, res: Response, next: NextFunction) => {
        logoff(req, (resp: IUser) => { res.json(resp) });
    };
}
