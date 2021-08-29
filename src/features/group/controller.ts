import { Model } from 'mongoose';
import { Request } from "express";
import { IGroup } from './../../models/Group';
import { IAuth } from "../../authServices";
import * as MSG from "../../utils/messages";
import item from "./model";
// var metadata = require('../metadata/metadataCtrl')

export interface IProfileCtrl {
    'getOne': (arg0: Request & IAuth, callback: any) => any;
    'getAll': (arg0: Request & IAuth, callback: any) => any;
    'save': (arg0: Request & IAuth, callback: any) => any;
    'update': (arg0: Request & IAuth, callback: any) => any;
    'remove': (arg0: Request & IAuth, callback: any) => any;
    'allFilter': (arg0: Request & IAuth, callback: any) => any;
    'counter': (arg0: Request & IAuth, callback: any) => any;
}


export default function (itemName: string) {

    // var ItemModel = require('./model')(itemName);
    const ItemModel = item(itemName);

    return {
        'getOne': getOne(ItemModel),
        'getAll': getAll(ItemModel),
        'save': save(ItemModel),
        'update': update(ItemModel),
        'remove': remove(ItemModel),
        'allFilter': allFilter(ItemModel),
        'counter': counter(ItemModel)
    }
}

function getOne(ItemModel: Model<IGroup>) {
    return (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTRUMENT_READ_ONE\n")

        ItemModel.findOne({ '_id': req.params.id }, (error: any, data: any) => { (error || !data) ? callback(MSG.errFind) : callback(data) })
            // .populate({ path: '_indicator', populate: { path: '_critery' } })
    }
}

function getAll(ItemModel: Model<IGroup>) {
    return (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTRUMENT_READ_ALL\n")

        ItemModel.find({}, (error: any, resp: any) => { (error || !resp) ? callback(MSG.errFind) : callback(resp) })
            // .populate({ path: '_indicator', populate: { path: '_critery' } })
            // .select('order description')
            .sort('name')
    }
}

function save(ItemModel: any) {
    return async (req: any, callback: Function) => {
        console.log("\tINSTRUMENT_CREATE\n")

        // var UserModel = require('mongoose').model('user');
        // var data = await UserModel.findOne({ '_id': req.userId }).select('accessLevel')
        // var user = data._doc;

        // switch (user.accessLevel) {
        //     // case "ADMINISTRATOR", "SUPERUSER":
        //     case "SUPERUSER":
        //         create();
        //         break;
        //     // case "EDITOR", "MANAGER", "REGISTERED":
        //     case "REGISTERED":
        //         callback(MSG.errConn);
        //         break;
        //     default:
        //         callback(MSG.errNoAuth);
        // }

        // async function create() {
        var newItem = new ItemModel(req.body);
        await newItem.save(function (error: any) { (error) ? callback(MSG.errSave) : callback(MSG.msgSuccess) });

        // metadata.create(req.userId, newItem._id, "instrument");
        // }
    }
}

function update(ItemModel: any) {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTRUMENT_UPDATE\n")

        // var UserModel = require('mongoose').model('user');
        // var data = await UserModel.findOne({ '_id': req.userId }).select('accessLevel')
        // var user = data._doc;

        // switch (user.accessLevel) {
        //     case "SUPERUSER":
        //         update();
        //         break;
        //     case "REGISTERED":
        //         callback(MSG.errLowLevel);
        //         break;
        //     default:
        //         callback(MSG.errNoAuth);
        // }

        // async function update() {
        await ItemModel.updateOne({ '_id': req.body._id }, req.body, (error: any) => {
            (error) ? callback(MSG.errUpd) : callback(MSG.msgSuccess)
        });

        // metadata.update(req.metadata, req.userId);
        // }
    }
}

function remove(ItemModel: any) {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTRUMENT_DELETE\n")

        // var UserModel = require('mongoose').model('user');
        // var data = await UserModel.findOne({ '_id': req.userId }).select('accessLevel')
        // var user = data._doc;

        // switch (user.accessLevel) {
        //     case "SUPERUSER":
        //         remove();
        //         break;
        //     case "REGISTERED":
        //         callback(MSG.errLowLevel);
        //         break;
        //     default:
        //         callback(MSG.errNoAuth);
        // }

        // async function remove() {
        await ItemModel.deleteOne({ '_id': req.params.id }, function (error: any) {
            (error) ? callback(MSG.errRem) : callback(MSG.msgSuccess);
        });


        // var IndicadorModel = model('indicador');
        // IndicadorModel.deleteMany({ '_meta': req.params.id }, function (error: any) {
        //     (error) ? console.log("INSTRUMENT_D_INDICADOR_D_ERROR: " + error) : console.log("INSTRUMENT_D_INDICADOR_D_OK");
        // });

        // var EquipeModel = model('equipe');
        // EquipeModel.deleteOne({ '_meta': req.params.id }, function (error: any) {
        //     (error) ? console.log("INSTRUMENT_D_EQUIPE_D_ERROR: " + error) : console.log("INSTRUMENT_D_EQUIPE_D_OK");
        // });

        // metadata.delete(req.metadata);
        // }
    }
}

function allFilter(ItemModel: any) {
    return async (req: any, callback: Function) => {
        console.log("\tINSTRUMENT_FILTER\n")

        // var UserModel = require('mongoose').model('user');
        // var data = await UserModel.findOne({ '_id': req.userId }).select('accessLevel')
        // var user = data._doc;

        // switch (user.accessLevel) {
        //     // case "ADMINISTRATOR", "MANAGER", "EDITOR", "SUPERUSER":
        //     case "SUPERUSER":
        //         allFilter();
        //         break;
        //     case "REGISTERED":
        //         callback(MSG.errNoPermission)
        //         break;
        //     default:
        //         callback(MSG.errNoAuth)
        // }

        // function allFilter() {
        ItemModel.find(req.body, (error: any, data: any) => { (error || !data) ? callback(MSG.errConn) : callback(data) })
            .populate({ path: '_indicador' })
            .sort('order');
        // }
    }
}

function counter(ItemModel: any) {
    return (req: Request & IAuth, callback: Function) => {
        ItemModel.count(req.body, (error: any, data: any) => {
            (error || !data) ? callback(MSG.errConn) : callback(data)
        });
    }
}