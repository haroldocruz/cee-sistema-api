import { model, Model } from 'mongoose';
import { Request } from "express";
import { IAuth } from "../../authServices";
import { IStatusMessage, msgErrConn, msgErrFind, msgErrRem, msgErrSave, msgErrUpd, msgSuccess } from "../../utils/messages";
import { IProfile } from '../../models/Profile';
import item from './model';

export interface IProfileCtrl {
    'getOne': (request: Request & IAuth, callback: (response: IStatusMessage & IProfile) => void) => any;
    'getAll': (request: Request & IAuth, callback: (response: IStatusMessage & IProfile[]) => void) => any;
    'save': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'bindingProfileUser': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'unBindingProfileUser': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'bindingProfileInstitution': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'unBindingProfileInstitution': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'update': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'remove': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'allFilter': (request: Request & IAuth, callback: (response: IStatusMessage & IProfile[]) => void) => any;
    'counter': (request: Request & IAuth, callback: (response: IStatusMessage & number) => void) => any;
}


export default function (itemName: string) {

    const ItemModel = item(itemName);

    return {
        'getOne': getOne(ItemModel),
        'getAll': getAll(ItemModel),
        'save': save(ItemModel),
        'bindingProfileUser': bindingProfileUser(),
        'unBindingProfileUser': unBindingProfileUser(),
        'bindingProfileInstitution': bindingProfileInstitution(),
        'unBindingProfileInstitution': unBindingProfileInstitution(),
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
                ? callback(msgErrFind)
                : callback(data)
        });
    }
}

function getAll(ItemModel: Model<IProfile>) {
    return (req: Request & IAuth, callback: Function) => {
        console.log("\tPROFILE_READ_ALL\n")

        ItemModel.find({}, (error: any, resp: any) => {
            (error || !resp)
                ? callback(msgErrFind)
                : callback(resp)
        });
    }
}

function save(ItemModel: any) {
    return async (req: any, callback: Function) => {
        console.log("\tPROFILE_CREATE\n")

        const ProfileModel = model('profile');
        let newItem = <IProfile>new ProfileModel(req.body);
        if (!newItem.__metadata)
            newItem.__metadata = {}

        newItem.__metadata._createdBy = req.userId;
        newItem.__metadata.createdAt = new Date();

        await newItem.save(function (error: any) {
            if (error) {
                console.log("ERROR CREATE: " + error);
                callback(msgErrSave)
                return;
            }

            callback(msgSuccess)
        });

    }
}

interface IBindingProfileUser {
    profileId: string;
    userId: string;
}

function bindingProfileUser() {
    return async (req: Request & IBindingProfileUser, callback: Function) => {
        console.log("\tPROFILE_USER_BINDING\n")

        const ProfileModel = model('profile');
        await ProfileModel.updateOne({ _id: req.body.profileId }, { $push: { '_userList': req.body.userId } })

        const UserModel = model('user');
        await UserModel.updateOne({ _id: req.body.userId }, { $push: { 'dataAccess._profileList': req.body.profileId } });

        callback(msgSuccess);
    }
}

function unBindingProfileUser() {
    return async (req: Request & IBindingProfileUser, callback: Function) => {
        console.log("\tPROFILE_USER_UNBINDING\n")

        const ProfileModel = model('profile');
        await ProfileModel.updateOne({ _id: req.body.profileId }, { $pull: { '_userList': req.body.userId } })

        const UserModel = model('user');
        await UserModel.updateOne({ _id: req.body.userId }, { $pull: { 'dataAccess._profileList': req.body.profileId } });

        callback(msgSuccess);
    }
}

interface IBindingProfileInstitution {
    profileId: string;
    institutionId: string;
}

function bindingProfileInstitution() {
    return async (req: Request & IBindingProfileInstitution, callback: Function) => {
        console.log("\tPROFILE_INSTITUTION_BINDING\n")

        const body: IBindingProfileInstitution = req.body;

        const ProfileModel = model('profile');
        await ProfileModel.updateOne({ _id: req.body.profileId }, { $push: { '_institutionList': req.body.institutionId } })

        const UserModel = model('institution');
        await UserModel.updateOne({ _id: req.body.institutionId }, { $push: { 'dataAccess._profileList': req.body.profileId } });

        callback(msgSuccess);
    }
}

function unBindingProfileInstitution() {
    return async (req: Request & IBindingProfileInstitution, callback: Function) => {
        console.log("\tPROFILE_INSTITUTION_UNBINDING\n")

        const ProfileModel = model('profile');
        await ProfileModel.updateOne({ _id: req.body.profileId }, { $pull: { '_institutionList': req.body.institutionId } })

        const UserModel = model('institution');
        await UserModel.updateOne({ _id: req.body.institutionId }, { $pull: { 'dataAccess._profileList': req.body.profileId } });

        callback(msgSuccess);
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
        //         callback(msgErrLowLevel);
        //         break;
        //     default:
        //         callback(msgErrNoAuth);
        // }

        // async function update() {
        await ItemModel.updateOne({ '_id': req.body._id }, req.body, (error: any) => {
            (error) ? callback(msgErrUpd) : callback(msgSuccess)
        });

        // metadata.update(req.metadata, req.userId);
        // }
    }
}

function remove(ItemModel: any) {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tPROFILE_DELETE\n")

        const ProfileModel = model('profile');
        await ProfileModel.deleteOne({ '_id': req.params.id }, function (error: any) {
            if (error) {
                console.log("ERROR_REMOVE: " + error);
                callback(msgErrRem)
                return;
            }

            callback(msgSuccess)
        });
    }
}

function allFilter(ItemModel: any) {
    return async (req: any, callback: Function) => {
        console.log("\tPROFILE_FILTER\n")

        ItemModel.find(req.body, (error: any, data: any) => {
            (error || !data)
                ? callback(msgErrConn)
                : callback(data)
        })
            .populate('_userList');
    }
}

function counter(ItemModel: any) {
    return (req: Request & IAuth, callback: Function) => {
        ItemModel.count(req.body, (error: any, data: any) => {
            (error || !data) ? callback(msgErrConn) : callback(data)
        });
    }
}