'use strict'

import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { AES, enc } from "crypto-js";
// import guard from "express-jwt-permissions";

import Crypt from "./utils/security/cryptograph";
import * as dotenv from "dotenv";
dotenv.config();

const jwt = require('jsonwebtoken');
const bcryptNodejs = require('bcrypt-nodejs');

import { model } from "mongoose";

import { IProfileCtrl } from './features/profile/controller';
import * as MSG from "./utils/messages";

// 2^rounds iterations of processing.
// From @garthk, on a 2GHz core you can roughly expect:
// const SALT_ROUNDS = 5;


export interface dataToToken {
    _id: string;
    role: any;
}

export interface IAuth {
    userId?: string;
    tokenData?: ITokenData;
}

interface ITokenData {
    date: Date;
    id: string;
    ipClient: string;
    group: string;
    groups: string;
}

export default {
    // encodeTextAES,
    // decodeTextAES,
    // createHash,
    // compareHash,
    // generateToken,
    // decodeToken,
    guard,
    isAuthorized
}

// async function encodeTextAES(text: string): Promise<string>{
//     return await AES.encrypt(text, process.env.SALT_KEY).toString();
// }

// async function decodeTextAES(cipherText: string): Promise<string>{
//     return await AES.decrypt(cipherText, process.env.SALT_KEY).toString(enc.Utf8);
// }

/**
 * @description Cria um hash de uma string passada
 * @param password String a qual será codificada
 * @returns Retorna um hash (string codificada)
 */
// async function createHash(password: string): Promise<string> {
//     const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
//     const hash = await bcrypt.hash(password, salt);
//     return hash;
// }

/**
 * @description Compara um dado com outro previamente codificado
 * @param reqPass String a ser comparada com a string previamente codificada
 * @param dataPass String previamente codificada
 * @returns Retorna um valor do tipo boolean (true|false)
 */
// async function compareHash(reqPass: string, dataPass: string): Promise<boolean> {
//     return await bcrypt.compare(reqPass, dataPass);
// }

/**
 * @description Codifica um token usando chave simétrica.
 * @param data Objeto com dados referentes ao usuário
 * @returns Retorna uma string codificada
 */
// async function generateToken(data: any): Promise<string> {
//     return jwt.sign({
//         exp: Math.floor(Date.now() / 1000) + (60 * 60),
//         data: data
//     }, process.env.SALT_KEY);
// }

/**
 * @description Decodifica o token convertendo para seu estado original
 * @param token {any} Recebe um token (informação codificada)
 * @returns Retorna uma promise do tipo 'qualquer tipo' ( pode ser uma string, objeto)
 */
// async function decodeToken(token: string): Promise<any> {
//     return await jwt.verify(token, process.env.SALT_KEY);
// }

const ROTAS = {
    "GET/user/": { 'groups': ['Administrador', 'Gerente', 'Registrado'], 'description': "Uma descrição aqui" },
    "GET/user/:id": { 'groups': ['Administrador', 'Gerente'], 'description': "Uma descrição aqui" },
    "POST/user/": { 'groups': ['Administrador', 'Gerente'], 'description': "Uma descrição aqui" },
    "PUT/user/:id": { 'groups': ['Administrador', 'Gerente'], 'description': "Uma descrição aqui" },
    "DELETE/user/:id": { 'groups': ['Administrador', 'Gerente'], 'description': "Uma descrição aqui" },
    "POST/user/filter": { 'groups': ['Administrador', 'Gerente'], 'description': "Uma descrição aqui" },
    "POST/user/counter": { 'groups': ['Administrador', 'Gerente'], 'description': "Uma descrição aqui" },

    "POST/auth/logout": { 'groups': ['Administrador', 'Gerente'], 'description': "Uma descrição aqui" },
}
const GROUPS = [{
    'name': "Administrador",
    'context': { name: 'CEE', identify: '' },
    'description': "Uma descrição aqui",
    'routes': [
        "GET/user/",
        "GET/user/:id",
        "POST/user/",
        "PUT/user/:id",
        "DELETE/user/:id",
        "POST/user/filter",
        "POST/user/counter",
        "POST/auth/logout"
    ]
},{
    'name': "SuperUser",
    'context': { name: 'CEE', identify: '' },
    'description': "Uma descrição aqui",
    'routes': [
        "GET/user/",
        "GET/user/:id",
        "POST/user/",
        "PUT/user/:id",
        "DELETE/user/:id",
        "POST/user/filter",
        "POST/user/counter",
        "POST/auth/logout"
    ]
}]

function guard() {

    const _middleware =  function _middleware(req: Request & IAuth, res: Response, next: NextFunction): void {
        console.log(req.method + req.baseUrl + req.route.path)
        const routeActual = req.method + req.baseUrl + req.route.path

        console.log("GROUPS",req.tokenData.groups)
        const groupList = JSON.parse(Crypt.decodeTextAES(req.tokenData.groups));
        console.log(groupList)
        const group = groupList[req.tokenData.group];
        
        // const groups = await Crypt.decodeTextAES(req.tokenData.groups);
        // const groups = req.body.groups;

        // required.includes(groups) ? next() : res.status(403).json([false, 'Permission denied'])
        // ROTAS[routeActual]?.groups?.includes(groups) ? next() : res.status(403).json([false, 'Permission denied'])
        GROUPS.find((e) => e.name === group )?.routes?.includes(routeActual) ? next() : res.status(403).json(MSG.errDenied)
    }

    //Conditionally skip a middleware when a condition is met.
    _middleware.unless = require('express-unless');

    return _middleware;
}

function isAuthorized(req: Request & IAuth, res: Response, next: NextFunction): void {

    console.log(req.method + req.baseUrl + req.route.path) //! APAGAR

    const token = req.body.token || req.query.token || req.params.token || req.headers['authorization'] || req.headers['x-access-token'];

    if (!token || token == undefined || token == "") {
        res.status(401).send(MSG.errNoToken);
    } else {
        jwt.verify(token, process.env.SALT_KEY, async function (error: any, decoded: {data: ITokenData}) {
            if (error) {
                console.log("TOKEN_ERROR: " + error)
                res.status(400).send(MSG.errToken);
            } else {
                const ipClient = req.connection.remoteAddress || req.socket.remoteAddress;
                console.log(decoded)
                if ( await Crypt.decodeTextAES(decoded.data.ipClient) != ipClient)
                    res.status(409).send(MSG.errToken)
                console.log("UserId: " + JSON.stringify(decoded.data.id), ipClient)
                req.userId = decoded.data.id;
                req.tokenData = decoded.data;
                req.body.token = token;
                next();
            }
        });
    }
}


/**
 * @description Middleware usado para dar permissão de acesso a certo recurso
 * @param required Array com regras
 * @param informed regra a ser verificada
 */
function isAllow(required: Array<string>, informed: string) {
    interface IToken {
        _id: string;
        date: Date;
        groups: string;
    }

    const _middleware = function _middleware(req: Request & IAuth, res: Response, next: NextFunction): void {

        const groups = req.tokenData.groups;

        required.includes(informed) ? next() : res.status(403).json([false, 'Permission denied'])
    }

    //Conditionally skip a middleware when a condition is met.
    _middleware.unless = require('express-unless');

    return _middleware;
}


// function getGroupList() {
//     let ProfileModel:IProfileCtrl = model('groups');
//     ProfileModel.getAll
// }