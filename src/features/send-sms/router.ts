import express, { NextFunction, Request, Response } from 'express';
import Twilio from "./twilio";

var router = express.Router();

export default function (itemName: string) {

    router.post('/', fnSendSms());

    return router;
}

function fnSendSms() {
    return (req: Request, res: Response, next: NextFunction) => {
        Twilio(req.body);
        res.send({ isOk: true, message: `SMS enviado`});
    };
}