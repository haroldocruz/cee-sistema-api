import { IToken } from './../../models/IToken';
import { Model, model } from "mongoose";
import { Request } from "express";
import { IUser } from './../../models/User';
import { IAuth } from "../../authServices";
import Crypt from "./../../utils/security/cryptograph";
import { Util } from "../../utils/util";
import { msgErrConn, msgErrFind, msgErrLogin, msgErrPass, msgErrUserAbsent, msgErrUserDeactived, msgErrUsername, msgSuccess } from '../../utils/messages';

export interface IAuthCtrl {
    'login': (arg0: Request & IAuth, callback: Function) => void;
    'logout': (arg0: Request & IAuth, callback: Function) => void;
    'logon': (arg0: Request & IAuth, callback: Function) => void;
    'logoff': (arg0: Request & IAuth, callback: Function) => void;
}

export default function () {

    const UserModel = <Model<IUser>>model('user');

    return {
        'login': fnLogIn(UserModel),
        'logout': fnLogOut(UserModel),
        'logon': fnLogOn(UserModel),
        'logoff': fnLogOff(UserModel),
    }
}

function fnLogIn(User: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => {
        console.info("\tUSER_LOGIN", req.body);

        //verificar se o username da requisição é 'email', 'cpf' ou uma expressão inválida
        // const cpf = Util.isValidCpf(req.body.username)
        // const email = Util.isValidEmail(req.body.username)
        const key: string = (() => {
            let username = req.body.username.trim();
            if (Util.isValidCpf(username)) {
                return "cpf";
            }
            else if (Util.isValidEmail(username)) {
                return "dataAccess.email";
            }
            else {
                return "invalid";
            }
        })();

        // se username for uma expressão inválida
        if (key === "invalid") { callback(msgErrUsername); return; }

        try {
            //buscar usuário no DB pelo 'email' ou 'cpf'
            const user = await User.findOne({ [key]: req.body.username })
                .select('+dataAccess.passwordHash')
                .populate("dataAccess._profileList dataAccess._profileDefault");

            //verificar se retornou algum usuário do DB
            if (!user) { callback(msgErrUserAbsent); return; }

            //verificar se o usuário está ativo
            if (!user.status) { callback(msgErrUserDeactived); return; }

            //verificar autenticidade do usuário
            autentication(req, <IUser>user, callback);

        } catch (error) {
            console.log(error);
            callback(msgErrConn);
        }
    }

    async function autentication(req: Request, user: IUser, callback: Function) {

        //verificar se usuário possui senha salva no DB
        if (!user.dataAccess.passwordHash) { callback(msgErrPass); return; }

        //verificar se a senha enviada é diferente da senha salva criptografada no DB
        if (await Crypt.compareHash(req.body.password, user.dataAccess.passwordHash)) {

            //verifica qual é o perfil padrão
            // const profile = user.dataAccess._profileList.find(function (profile){ user.dataAccess._profileDefault == profile });
            const profileLogin = user.dataAccess._profileDefault || user.dataAccess._profileList[0];

            //pegar o ip do cliente que fez a conexão
            const ipClient = req.connection.remoteAddress || req.socket.remoteAddress;

            //pegar o momento atual (data)
            const actualDate = new Date();

            //formatar um token usando:
            // -momento atual;
            // -id do usuário;
            // -ip do cliente (deverá ser criptografado);
            // -grupo/perfil atual do usuário;
            // -lista dos grupos/perfis a qual o usuário pertence (deverá ser criptografado)
            const formattedToken: IToken = {
                'actualDate': actualDate,
                'id': user._id,
                'ipClient': await Crypt.encodeTextAES(ipClient),
                'profileLogin': profileLogin,
                'profileList': (user.dataAccess._profileList) ? await Crypt.encodeTextAES(JSON.stringify(user.dataAccess._profileList)) : null
            }

            //gerar o token
            const token = await Crypt.generateToken(formattedToken);

            //formatar informações de login
            user.loginInfo.lastDate = user.loginInfo.actualDate;
            user.loginInfo.actualDate = actualDate;
            user.loginInfo.ipClient = ipClient;
            user.loginInfo._profileLogin = profileLogin;
            user.loginInfo.token = token;
            user.loginInfo.accessCount = +user.loginInfo.accessCount + 1;

            //responder cliente e guardar novas informações de login no DB
            userLoginInfoUpdate(user, callback);
        } else {
            callback(msgErrPass);
            return;
        }
    }

    async function userLoginInfoUpdate(user: IUser, callback: Function) {
        user.update({ $set: user }).exec((error) => {
            if (error) {
                console.log("USER_LOGIN_ERROR: " + error);
                callback(msgErrLogin);
                return;
            }
            else {
                callback(user);
                return;
            }
        });
        // User.updateOne({ '_id': user._id }, { $set: user }, {}, (error) => {
        //     if (error) {
        //         console.log("USER_LOGIN_ERROR: " + error);
        //         callback(ErrLogin);
        //         return;
        //     }
        //     else {
        //         callback(user);
        //         return;
        //     }
        // });
    }
}

function fnLogOut(User: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => {

        const loginInfo = { 'loginInfo.token': undefined };
        const find = { '_id': req.userId, 'loginInfo.token': req.body.token }

        const update = await User.updateOne(find, loginInfo);

        if (update.nModified === 0) {
            callback(msgErrFind);
            return;
        }

        callback(msgSuccess);
        return;
    }
}

function fnLogOn(User: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => { }
}

function fnLogOff(User: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => { }
}