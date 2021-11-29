import { model, NativeError } from 'mongoose';
import { Request } from "express";
import { IAuth } from "../../authServices";
import { IStatusMessage, msgErr5xx, msgErrConn, msgErrFind, msgErrRem, msgErrSave, msgErrUnexpected, msgSuccess } from "../../utils/messages";
import { IInstitution, IInstitutionBase } from '../../models/Institution';
import item from './model';
import { IProfile } from '../../models/Profile';
import { IUser } from '../../models/User';
import { IQueryConfig } from '../../models/IQueryConfig';

export interface IInstitutionCtrl {
    'getOne'?: (request: Request & IAuth, callback: (response: IStatusMessage & IInstitution) => void) => any;
    'getAll'?: (request: Request & IAuth, callback: (response: IStatusMessage & IInstitution[]) => void) => any;
    'save'?: (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'bindMember'?: (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'unbindMember'?: (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'update'?: (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'remove'?: (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'filterOne'?: (request: Request & IAuth, callback: (response: IStatusMessage & IInstitution) => void) => any;
    'filterAll'?: (request: Request & IAuth, callback: (response: IStatusMessage & IInstitution[]) => void) => any;
    'counter'?: (request: Request & IAuth, callback: (response: IStatusMessage & number) => void) => any;
}

export default function (itemName: string) {

    const ItemModel = item(itemName);

    const ItemCtrl: IInstitutionCtrl = {
        'getOne': getOne(),
        'getAll': getAll(),
        'save': save(),
        'bindMember': bindMember(),
        'unbindMember': unbindMember(),
        'update': update(),
        'remove': remove(),
        'filterOne': filterOne(),
        'filterAll': filterAll(),
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
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_READ_ALL\n");

        const select = ['context', 'name', 'institutionType']

        const InstitutionModel = model('institution');
        const query = InstitutionModel.find({}).select(select)

        try {
            const data = <IInstitution[]>await query.exec();
            if (data.length === 0) { callback(msgErrFind); return; }
            callback(data);
        }
        catch (error) {
            console.log("ERROR: ", error);
            callback(msgErrUnexpected);
        }
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

interface IBindingInstitution {
    status: boolean;
    context: string,

    _profile: string;
    profileName: string;
    _user: string;
    userName: string;
}
interface IBindingUser {
    status: boolean;
    context: string,

    _profile: string,
    profileName: string,
    _institution: string,
    institutionName: string,
}

interface IReqBindMember {
    status: boolean;
    context: string;

    _profile: IProfile & string;
    profileName: string;

    _institution: IInstitution & string;
    institutionName: string;

    _user: IUser & string;
    userName: string;

}

function bindMember() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_MEMBER_BINDING\n");

        const reqBindingMember: IReqBindMember = req.body;
        const bindingInstitution: IBindingInstitution = reqBindingMember;
        const bindingUser: IBindingUser = reqBindingMember;

        try {
            const InstitutionModel = model('institution');
            await InstitutionModel.updateOne({ _id: reqBindingMember._institution }, { $push: { 'memberList': [bindingInstitution] } })

            const UserModel = model('user');
            await UserModel.updateOne({ _id: reqBindingMember._user }, { $push: { 'dataAccess.bindList': [bindingUser] } });

            callback(msgSuccess);
        }
        catch (error) {
            console.log("ERROR: ", error);
            callback(msgErrUnexpected);
        }
    }
}

function unbindMember() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tINSTITUTION_MEMBER_UNBINDING\n");

        const reqBindingMember: IReqBindMember = req.body;
        const bindingInstitution: IBindingInstitution = {
            status: reqBindingMember.status,
            context: reqBindingMember.context,
            _profile: reqBindingMember._profile,
            profileName: reqBindingMember.profileName,
            _user: reqBindingMember._user,
            userName: reqBindingMember.userName
        };
        const bindingUser: IBindingUser = {
            status: reqBindingMember.status,
            context: reqBindingMember.context,
            _profile: reqBindingMember._profile,
            profileName: reqBindingMember.profileName,
            _institution: reqBindingMember._institution,
            institutionName: reqBindingMember.institutionName
        };

        try {
            const InstitutionModel = model('institution');
            const q1 = await InstitutionModel.updateOne({ _id: reqBindingMember._institution }, { $pull: { 'memberList': bindingInstitution } })
            console.log("q1", q1);

            const UserModel = model('user');
            const q2 = await UserModel.updateOne({ _id: reqBindingMember._user }, { $pull: { 'dataAccess.bindList': bindingUser } });
            console.log("q2", q2);

            callback(msgSuccess);
        }
        catch (error) {
            console.log("ERROR: ", error);
            callback(msgErrUnexpected);
        }
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

function filterOne() {
    return async (req: any, callback: Function) => {
        console.log("\tINSTITUTION_FILTER_ONE\n");

        const institution: IInstitutionBase = req.body.filter;
        const config: IQueryConfig = req.body.queryConfig;

        const InstitutionModel = model('institution');
        const query = InstitutionModel.findOne(institution);

        config.populateList.forEach((e) => {
            query.populate({ path: e.path, select: e.select })
        })

        try {
            const data = <IInstitution>await query.exec();
            if (!data) { callback(msgErrFind); return; }
            callback(data);
        }
        catch (error) {
            console.log("ERROR: ", error);
            callback(msgErrUnexpected);
        }
    }
}

function filterAll() {
    return async (req: any, callback: Function) => {
        console.log("\tINSTITUTION_FILTER_ALL\n");

        const institution: IInstitutionBase = req.body.filter;
        const config: IQueryConfig = req.body.queryConfig;

        const InstitutionModel = model('institution');
        const query = InstitutionModel.find(institution);

        config.populateList.forEach((e) => {
            query.populate({ path: e.path, select: e.select })
        })

        try {
            const data = <IInstitution[]>await query.exec();
            if (data.length === 0) { callback(msgErrFind); return; }
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