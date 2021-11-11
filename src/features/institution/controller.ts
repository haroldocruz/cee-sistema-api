import { model } from 'mongoose';
import { Request } from "express";
import { IAuth } from "../../authServices";
import * as MSG from "../../utils/messages";
import { IInstitution } from '../../models/Institution';
import item from './model';
import { IMessage } from '../../messages';

export interface IInstitutionCtrl {
    'getOne': (request: Request & IAuth, callback: (response: IMessage & IInstitution) => void) => any;
    'getAll': (request: Request & IAuth, callback: (response: IMessage & IInstitution[]) => void) => any;
    'save': (request: Request & IAuth, callback: (response: IMessage) => void) => any;
    'bindingInstitutionProfile': (request: Request & IAuth, callback: (response: IMessage) => void) => any;
    'unBindingInstitutionProfile': (request: Request & IAuth, callback: (response: IMessage) => void) => any;
    'update': (request: Request & IAuth, callback: (response: IMessage) => void) => any;
    'remove': (request: Request & IAuth, callback: (response: IMessage) => void) => any;
    'allFilter': (request: Request & IAuth, callback: (response: IMessage & IInstitution[]) => void) => any;
    'counter': (request: Request & IAuth, callback: (response: IMessage & number) => void) => any;
}

export default function (itemName: string) {

    const itemModel: IInstitutionCtrl = {
        'getOne': getOne(),
        'getAll': getAll(),
        'save': save(),
        'bindingInstitutionProfile': bindingInstitutionProfile(),
        'unBindingInstitutionProfile': unBindingInstitutionProfile(),
        'update': update(),
        'remove': remove(),
        'allFilter': allFilter(),
        'counter': counter()
    }

    return itemModel;
}

function getOne() {
    return (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_READ_ONE\n");

        const InstitutionModel = model('institution');
        InstitutionModel.findOne({ '_id': req.params.id }, (error: any, data: IInstitution) => {
            (error || !data)
                ? callback(MSG.errFind)
                : callback(data)
        });
    }
}

function getAll() {
    return (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_READ_ALL\n");

        const InstitutionModel = model('institution');
        InstitutionModel.find({}, (error: any, resp: any) => {
            (error || !resp)
                ? callback(MSG.errFind)
                : callback(resp)
        });
    }
}

function save() {
    return async (req: any, callback: Function) => {
        console.log("\tINSTITUTION_CREATE\n");

        const InstitutionModel = model('institution');
        let newItem = <IInstitution>new InstitutionModel(req.body);
        if (!newItem.__metadata)
            newItem.__metadata = {}

        newItem.__metadata._createdBy = req.userId;
        newItem.__metadata.createdAt = new Date();

        await newItem.save(function (error: any) {
            if (error) {
                console.log("ERROR CREATE: " + error);
                callback(MSG.errSave)
                return;
            }

            callback(MSG.msgSuccess)
        });

    }
}

interface IBindingInstitutionProfile {
    institutionId: string;
    profileId: string;
}

function bindingInstitutionProfile() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_PROFILE_BINDING\n");

        const binding: IBindingInstitutionProfile = req.body;

        const InstitutionModel = model('institution');
        await InstitutionModel.updateOne({ _id: binding.institutionId }, { $push: { '_profileList': binding.profileId } })

        const ProfileModel = model('profile');
        await ProfileModel.updateOne({ _id: binding.profileId }, { $push: { '_institutionList': binding.institutionId } });

        callback(MSG.msgSuccess);
    }
}

function unBindingInstitutionProfile() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_PROFILE_UNBINDING\n");

        const binding: IBindingInstitutionProfile = req.body;

        const InstitutionModel = model('institution');
        await InstitutionModel.updateOne({ _id: binding.institutionId }, { $pull: { '_profileList': binding.profileId } })

        const ProfileModel = model('profile');
        await ProfileModel.updateOne({ _id: binding.profileId }, { $pull: { '_institutionList': binding.institutionId } });

        callback(MSG.msgSuccess)
    }
}

function update() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_UPDATE\n");

        let institution: IInstitution = req.body;

        if (!institution.__metadata)
            institution.__metadata = {}
        institution.__metadata._modifiedBy = req.userId;
        institution.__metadata.modifiedAt = new Date();

        const InstitutionModel = model('institution');
        const query = await InstitutionModel.updateOne({ '_id': institution._id }, req.body)

        console.log("query: ", query);
        // callback(MSG.errUpd)
        callback(MSG.msgSuccess)
    }
}

function remove() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_DELETE\n");

        const InstitutionModel = model('institution');
        await InstitutionModel.deleteOne({ '_id': req.params.id }, function (error: any) {
            (error) ? callback(MSG.errRem) : callback(MSG.msgSuccess);
        });
    }
}

function allFilter() {
    return async (req: any, callback: Function) => {
        console.log("\tINSTITUTION_FILTER\n");

        const InstitutionModel = model('institution');
        InstitutionModel.find(req.body, (error: any, data: any) => {
            (error || !data)
                ? callback(MSG.errConn)
                : callback(data)
        })
            .populate('_userList');
    }
}

function counter() {
    return (req: Request & IAuth, callback: Function) => {

        const InstitutionModel = model('institution');
        InstitutionModel.count(req.body, (error: any, data: any) => {
            (error || !data) ? callback(MSG.errConn) : callback(data)
        });
    }
}