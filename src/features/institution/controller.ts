import { model, NativeError } from 'mongoose';
import { Request } from "express";
import { IAuth } from "../../authServices";
import { IStatusMessage, msgErr5xx, msgErrConn, msgErrFind, msgErrRem, msgErrSave, msgErrUnexpected, msgSuccess } from "../../utils/messages";
import { IInstitution } from '../../models/Institution';
import item from './model';

export interface IInstitutionCtrl {
    'getOne'?: (request: Request & IAuth, callback: (response: IStatusMessage & IInstitution) => void) => any;
    'getAll'?: (request: Request & IAuth, callback: (response: IStatusMessage & IInstitution[]) => void) => any;
    'save'?: (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'bindingMember'?: (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'unbindingMember'?: (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'update'?: (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'remove'?: (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'allFilter'?: (request: Request & IAuth, callback: (response: IStatusMessage & IInstitution[]) => void) => any;
    'counter'?: (request: Request & IAuth, callback: (response: IStatusMessage & number) => void) => any;
}

export default function (itemName: string) {

    const ItemModel = item(itemName);

    const ItemCtrl: IInstitutionCtrl = {
        'getOne': getOne(),
        'getAll': getAll(),
        'save': save(),
        'bindingMember': bindingMember(),
        'unbindingMember': unbindingMember(),
        'update': update(),
        'remove': remove(),
        'allFilter': allFilter(),
        'counter': counter()
    }

    return ItemCtrl;
}

function getOne() {
    return (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_READ_ONE\n");

        const InstitutionModel = model('institution');
        InstitutionModel.findOne({ '_id': req.params.id }, (error: any, data: IInstitution) => {
            (error || !data)
                ? callback(msgErrFind)
                : callback(data)
        });
    }
}

function getAll() {
    return (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_READ_ALL\n");

        const select = 'context name'

        const InstitutionModel = model('institution');
        const query = InstitutionModel.find({}).select(select)


        query.exec((error: any, resp: IInstitution[]) => {
            (error || !resp)
                ? callback(msgErrFind)
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
                callback(msgErrSave)
                return;
            }

            callback(msgSuccess)
        });

    }
}

interface IBindingMember {
    institutionId: string;

    status: boolean;
    profileId: string;
    userId: string;
}

function bindingMember() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_MEMBER_BINDING\n");

        const binding: IBindingMember = req.body;

        const InstitutionModel = model('institution');
        await InstitutionModel.updateOne({ _id: binding.institutionId }, { $push: { '_memberList': binding } })

        const UserModel = model('user');
        await UserModel.updateOne({ _id: binding.userId }, { $push: { '_institutionList': binding.institutionId } });

        callback(msgSuccess);
    }
}

function unbindingMember() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_MEMBER_UNBINDING\n");

        const binding: IBindingMember = req.body;

        const InstitutionModel = model('institution');
        await InstitutionModel.updateOne({ _id: binding.institutionId }, { $pull: { '_memberList': binding } })

        const UserModel = model('user');
        await UserModel.updateOne({ _id: binding.profileId }, { $pull: { '_institutionList': binding.institutionId } });

        callback(msgSuccess)
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
        // callback(msgErrUpd)
        callback(msgSuccess)
    }
}

function remove() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_DELETE\n");

        const InstitutionModel = model('institution');
        await InstitutionModel.deleteOne({ '_id': req.params.id }, function (error: any) {
            (error) ? callback(msgErrRem) : callback(msgSuccess);
        });
    }
}

interface IQueryConfig {
    populateList: { path: string, select?: string[] }[]
}

function allFilter() {
    return async (req: any, callback: Function) => {
        console.log("\tINSTITUTION_FILTER\n");

        const institution: any = req.body.object;
        const config: IQueryConfig = req.body.config;

        const InstitutionModel = model('institution');
        const query = InstitutionModel.find(institution);

        config.populateList.forEach((e) => {
            query.populate({ path: e.path, select: e.select })
        })

        try {
            const data = <IInstitution[] | NativeError>await query.exec();
            if (data instanceof NativeError) {
                callback(msgErr5xx);
                return;
            }
            callback(data);
        }
        catch (error) {
            console.log("ERROR: ", error);
            callback(msgErrUnexpected);
        }
    }
}

function counter() {
    return (req: Request & IAuth, callback: Function) => {

        const InstitutionModel = model('institution');
        InstitutionModel.count(req.body, (error: any, data: any) => {
            (error || !data) ? callback(msgErrConn) : callback(data)
        });
    }
}