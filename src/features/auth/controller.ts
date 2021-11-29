import { IToken } from './../../models/IToken';
import { Model, model, NativeError } from "mongoose";
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

interface ILoginData {
    username: string;
    password: string;
}

interface IQueryConfig {
    populateList: { path: string, select?: string[] }[]
}

function fnLogIn(User: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => {
        console.info("\tUSER_LOGIN");

        const loginData: ILoginData = req.body;

        //verificar se o username da requisição é 'email', 'cpf' ou uma expressão inválida
        // const cpf = Util.isValidCpf(loginData.username)
        // const email = Util.isValidEmail(loginData.username)
        const key: string = verifyUsername(loginData);

        // se username for uma expressão inválida
        if (key === "invalid") { callback(msgErrUsername); return; }

        try {
            const config: IQueryConfig = {
                populateList: [
                    // { path: "dataAccess._profileList", select: ['name', 'context'] },
                    // { path: "dataAccess._profileDefault", select: ['name', 'context'] }
                ]
            }
            //buscar usuário no DB pelo 'email' ou 'cpf'
            const UserModel = model('user');
            const queryUser = UserModel.findOne({ [key]: loginData.username });
            queryUser.select('+dataAccess.passwordHash');
            queryUser.populate(config.populateList);

            const user = <IUser>await queryUser.exec();

            if (!user) { callback(msgErrUserAbsent); return; }
            if (!user.status) { callback(msgErrUserDeactived); return; }


            // const user = await User.findOne({ [key]: loginData.username })
            //     .select('+dataAccess.passwordHash')
            //     .populate([{ path: "dataAccess._profileList", select: ['name', 'context'] }, { path: "dataAccess._profileDefault", select: ['name', 'context'] }]);

            // //verificar se retornou algum usuário do DB
            // if (!user) { callback(msgErrUserAbsent); return; }

            // //verificar se o usuário está ativo
            // if (!user.status) { callback(msgErrUserDeactived); return; }

            //verificar autenticidade do usuário
            autentication(req, user, callback);

        } catch (error) {
            console.log("ERROR ", error);
            callback(msgErrConn);
        }
    }

    function verifyUsername(loginData: ILoginData) {
        let username = loginData.username.trim();
        if (Util.isValidCpf(username)) {
            return "cpf";
        }
        else if (Util.isValidEmail(username)) {
            return "dataAccess.email";
        }
        else {
            return "invalid";
        }
    }

    async function autentication(req: Request, user: IUser, callback: Function) {

        //verificar se usuário possui senha salva no DB
        if (!user.dataAccess.passwordHash) { callback(msgErrPass); return; }

        //verificar se a senha enviada é diferente da senha salva criptografada no DB
        if (await Crypt.compareHash(req.body.password, user.dataAccess.passwordHash)) {

            //verifica qual é o perfil padrão
            const bindList = user.dataAccess?.bindList;
            const bindLogin = user.dataAccess?.bindDefault || (bindList.length > 0) ? user.dataAccess?.bindList[0] : null;
            console.log("bindLogin", bindLogin);

            // const profileList = user.dataAccess?._profileList;
            // const profileLogin = user.dataAccess?._profileDefault || (profileList.length > 0) ? user.dataAccess?._profileList[0] : null;

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
                'bindLogin': bindLogin,
                'bindList': (bindList.length > 0) ? await Crypt.encodeTextAES(JSON.stringify(bindList)) : undefined
                // 'profileLogin': bindLogin,
                // 'profileList': (bindList.length > 0) ? await Crypt.encodeTextAES(JSON.stringify(bindList)) : undefined
            }

            //gerar o token
            const token = await Crypt.generateToken(formattedToken);

            //formatar informações de login
            user.loginInfo.lastDate = user.loginInfo.actualDate;
            user.loginInfo.actualDate = actualDate;
            user.loginInfo.ipClient = ipClient;
            user.loginInfo.currentBind = bindLogin;
            // user.loginInfo._profileLogin = bindLogin;
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

        //! Aguardar atualização do mongoose - algum erro no @type do updateOne.
        //! A atualização previu mudança nos atributos, mas na prática acabou
        //! por não aplicarem, a mudança ocorreu apenas no @type
        const up = <any>update;

        if (up.nModified === 0) {
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