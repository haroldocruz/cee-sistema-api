import express, { NextFunction, Request, Response } from 'express';
import NodeMailer from "./nodemailer";

var router = express.Router();

export default function (itemName: string) {

    router.post('/', fnSendMail());

    return router;
}

function fnSendMail() {
    return (req: Request, res: Response, next: NextFunction) => {
        NodeMailer(req.body);
        res.send({ isOk: true, message: `Email enviado`});
    };
}