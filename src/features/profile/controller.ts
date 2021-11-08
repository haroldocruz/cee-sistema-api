import { model, Model } from 'mongoose';
import { Request } from "express";
import { IAuth } from "../../authServices";
import * as MSG from "../../utils/messages";
import { IProfile } from '../../models/Profile';
import item from './model';
import { IMessage } from '../../messages';
// var metadata = require('../metadata/metadataCtrl')

export interface IProfileCtrl {
    'getOne': (request: Request & IAuth, callback: (response: IMessage & IProfile) => void) => any;
    'getAll': (request: Request & IAuth, callback: (response: IMessage & IProfile[]) => void) => any;
    'save': (request: Request & IAuth, callback: (response: IMessage) => void) => any;
    'bindingProfileUser': (request: Request & IAuth, callback: (response: IMessage) => void) => any;
    'update': (request: Request & IAuth, callback: (response: IMessage) => void) => any;
    'remove': (request: Request & IAuth, callback: (response: IMessage) => void) => any;
    'allFilter': (request: Request & IAuth, callback: (response: IMessage & IProfile[]) => void) => any;
    'counter': (request: Request & IAuth, callback: (response: IMessage & number) => void) => any;
}


export default function (itemName: string) {

    const ItemModel = item(itemName);

    return {
        'getOne': getOne(ItemModel),
        'getAll': getAll(ItemModel),
        'save': save(ItemModel),
        'bindingProfileUser': bindingProfileUser(ItemModel),
        'update': update(ItemModel),
        'remove': remove(ItemModel),
        'allFilter': allFilter(ItemModel),
        'counter': counter(ItemModel)
    }
}

function getOne(ItemModel: Model<IProfile>) {
    return (req: Request & IAuth, callback: Function) => {
        console.log("\tPROFILE_READ_ONE\n")

        ItemModel.findOne({ '_id': req.params.id }, (error: any, data: IProfile) => {
            (error || !data)
                ? callback(MSG.errFind)
                : callback(data)
        });
    }
}

function getAll(ItemModel: Model<IProfile>) {
    return (req: Request & IAuth, callback: Function) => {
        console.log("\tPROFILE_READ_ALL\n")

        ItemModel.find({}, (error: any, resp: any) => {
            (error || !resp)
                ? callback(MSG.errFind)
                : callback(resp)
        });
    }
}

function save(ItemModel: any) {
    return async (req: any, callback: Function) => {
        console.log("\tPROFILE_CREATE\n")

        var newItem = new ItemModel(req.body);
        await newItem.save(function (error: any) {
            (error)
                ? callback(MSG.errSave)
                : callback(MSG.msgSuccess)
        });

    }
}

interface IBinding {
    profileId: string;
    userId: string;
}

function bindingProfileUser(ItemModel: any) {
    return async (req: Request & IBinding, callback: Function) => {
        console.log("\tPROFILE_USER_BINDING\n")

        const ProfileModel = model('profile');
        await ProfileModel.updateOne({ _id: req.body.profileId }, { $push: { '_userList': req.body.userId } })

        const UserModel = model('user');
        await UserModel.updateOne({ _id: req.body.userId }, { $push: { 'dataAccess._profileList': req.body.profileId } });
            // (error)
            //     ? callback(MSG.errUpd)
            //     : 
                callback(MSG.msgSuccess);

        // if (!profileQuery.isModified) { callback(MSG.errUpd); return }

        // const UserModel = Mongoose.model('user');
        // const userQuery = await UserModel.findByIdAndUpdate(req.userId, { 'dataAccess': { $push: { '_profileList': req.profileId } } });

        // // if (!userQuery.isModified) { callback(MSG.errUpd); return }

        // callback(MSG.msgSuccess);
    }
}

function update(ItemModel: any) {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tPROFILE_UPDATE\n")

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
        console.log("\tPROFILE_DELETE\n")

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
        //     (error) ? console.log("PROFILE_D_INDICADOR_D_ERROR: " + error) : console.log("PROFILE_D_INDICADOR_D_OK");
        // });

        // var EquipeModel = model('equipe');
        // EquipeModel.deleteOne({ '_meta': req.params.id }, function (error: any) {
        //     (error) ? console.log("PROFILE_D_EQUIPE_D_ERROR: " + error) : console.log("PROFILE_D_EQUIPE_D_OK");
        // });

        // metadata.delete(req.metadata);
        // }
    }
}

function allFilter(ItemModel: any) {
    return async (req: any, callback: Function) => {
        console.log("\tPROFILE_FILTER\n")

        ItemModel.find(req.body, (error: any, data: any) => {
            (error || !data)
                ? callback(MSG.errConn)
                : callback(data)
        })
        .populate('_userList');
    }
}

function counter(ItemModel: any) {
    return (req: Request & IAuth, callback: Function) => {
        ItemModel.count(req.body, (error: any, data: any) => {
            (error || !data) ? callback(MSG.errConn) : callback(data)
        });
    }
}