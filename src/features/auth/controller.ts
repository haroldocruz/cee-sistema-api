import { Model, model } from "mongoose";
import { Request } from "express";
import { IUser } from './../../models/User';
import * as MSG from '../../utils/messages';
import { IAuth } from "../../authServices";
import Crypt from "./../../utils/security/cryptograph";

export interface IAuthCtrl {
    'login': (arg0: Request & IAuth, callback: Function) => void;
    'logout': (arg0: Request & IAuth, callback: Function) => void;
    'logon': (arg0: Request & IAuth, callback: Function) => void;
    'logoff': (arg0: Request & IAuth, callback: Function) => void;
}

export default function () {

    const ItemModel = <Model<IUser>>model('user');

    return {
        'login': fnLogIn(ItemModel),
        'logout': fnLogOut(ItemModel),
        'logon': fnLogOn(ItemModel),
        'logoff': fnLogOff(ItemModel),
    }
}

function fnLogIn(User: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => {
        console.info("\tUSER_LOGIN", req.body);

        //TODO: verificar se o username da requisição é 'email' ou 'cpf'
        try {
            //buscar usuário no DB pelo 'email' ou 'cpf'
            const user = await User.findOne({ 'cpf': req.body.username }).select('+dataAccess.passwordHash +dataAccess.groupList +dataAccess.groupDefault');

            //verificar autenticidade do usuário
            autentication(req, <IUser>user, callback)

        } catch (error) {
            console.log(error)
        }
    }

    async function autentication(req: Request, user: IUser, callback: Function) {

        //verificar se retornou algum usuário do DB
        if (!user) { callback(MSG.errUserAbsent); return; }
        //verificar se usuário possui senha guardada no DB
        if (!user.dataAccess.passwordHash) { callback(MSG.errPass); return; }

        //verificar se a senha enviada é diferente da senha salva criptografada no DB
        if (await Crypt.compareHash(req.body.password, user.dataAccess.passwordHash)) {

            //verifica qual é o perfil padrão
            // const group = user.dataAccess.groupList.find(function (group){ user.dataAccess.groupDefault == group });
            const group = user.dataAccess.groupDefault;

            //pegar o ip do cliente que fez a conexão
            const ipClient = req.connection.remoteAddress || req.socket.remoteAddress;

            //pegar o momento atual (data)
            const actualDate = new Date();

            //gerar um token baseado em:
            // -momento atual;
            // -id do usuário;
            // -ip do cliente (deverá ser criptografado);
            // -grupo/perfil atual do usuário;
            // -lista dos grupos/perfis a qual o usuário pertence (deverá ser criptografado)
            const token = await Crypt.generateToken({
                'date': actualDate,
                'id': user._id,
                'ipClient': await Crypt.encodeTextAES(ipClient),
                'group': group,
                'groupList': (user.dataAccess.groupList) ? await Crypt.encodeTextAES(JSON.stringify(user.dataAccess.groupList)) : null
            });

            //atualizar informações de login
            user.loginInfo.lastDate = user.loginInfo.actualDate;
            user.loginInfo.actualDate = actualDate;
            user.loginInfo.ipClient = ipClient;
            user.loginInfo.group = group;
            user.loginInfo.token = token;

            //guardar as novas informações de login no DB
            userLoginInfoUpdate(user, callback);
        } else {
            callback(MSG.errPass);
        }
    }

    async function userLoginInfoUpdate(user: IUser, callback: Function) {
        console.log(user) //!APAGAR
        User.updateOne({ '_id': user._id }, { $set: user }, {}, (error) => {
            if (error) {
                console.log("USER_LOGIN_ERROR: " + error);
                callback(MSG.errLogin);
            }
            else {
                callback(user);
            }
        });
    }
}

function fnLogOut(User: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => {

        const loginInfo = { 'loginInfo': undefined };
        const find = { '_id': req.userId, 'loginInfo.token': req.body.token }

        const update = await User.updateOne(find, loginInfo);

        if (update.nModified === 0) {
            callback(MSG.errFind);
            return;
        }

        callback(MSG.msgSuccess);
    }
}

function fnLogOn(User: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => { }
}

function fnLogOff(User: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => { }
}