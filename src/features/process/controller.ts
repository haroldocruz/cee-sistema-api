import { model, UpdateWriteOpResult } from 'mongoose';
import { Request } from "express";
import { IAuth } from "../../authServices";
import { IStatusMessage, msgErrFind,  msgErrRemVoid, msgErrUnexpected, msgErrUpdVoid, msgSuccess } from "../../utils/messages";
import { IProcess } from '../../models/Process';
import item from './model';
import { DeleteResult } from 'mongoose/node_modules/mongodb';

export interface IProcessCtrl {
    'getOne': (request: Request & IAuth, callback: (response: IStatusMessage & IProcess) => void) => any;
    'getAll': (request: Request & IAuth, callback: (response: IStatusMessage & IProcess[]) => void) => any;
    'save': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'bindProcess': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'unbindProcess': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'update': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'remove': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
    'counter': (request: Request & IAuth, callback: (response: IStatusMessage & number) => void) => any;
}


export default function (itemName: string) {

    const ItemModel = item(itemName);

    return {
        'getOne': getOne(),
        'getAll': getAll(),
        'save': save(),
        'bindProcess': bindProcess(),
        'unbindProcess': unbindProcess(),
        'update': update(),
        'remove': remove(),
        'counter': counter()
    }
}

function getOne() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tPROCESS_READ_ONE\n");

        const id = req.params._id || req.body.id;

        try {
            const query = model('process').findOne({ '_id': id });

            let data = await query.exec();
            (data)
                ? callback(data)
                : callback(msgErrFind)
        }
        catch (error) {
            console.error("\tPROCESS_READ_ONE_ERROR\n", error);
            callback(msgErrUnexpected);
        }
    }
}

function getAll() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tPROCESS_READ_ALL\n");

        const filter = req.body || {};

        try {
            const ItemModel = model('process');
            const query = ItemModel.find(filter);

            let data = await query.exec();
            (data)
                ? callback(data)
                : callback(msgErrFind)
        }
        catch (error) {
            console.error("\tPROCESS_READ_ALL_ERROR\n", error);
            callback(msgErrUnexpected);
        }
    }
}

function save() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tPROCESS_CREATE\n")

        const ItemModel = model('Process');
        let newItem = <IProcess>new ItemModel(req.body);
        if (!newItem.__metadata)
            newItem.__metadata = {}

        newItem.__metadata._createdBy = req.userId;
        newItem.__metadata.createdAt = new Date();

        try {
            const queryData = await newItem.save();
            callback(msgSuccess);

        } catch (error) {
            console.error("\tPROCESS_CREATE_ERROR\n");
            callback(msgErrUnexpected);
        }
    }
}

interface IBindingProcessUser {
    processId: string;
    institutionId: string;
}

function bindProcess() {
    return async (req: Request & IBindingProcessUser, callback: Function) => {
        console.log("\tPROCESS_BINDING\n");

        try {
            const ProcessModel = model('Process');
            const query = ProcessModel.updateOne({ _id: req.body.ProcessId }, { $push: { '_interestedList': req.body.institutionId } })

            const data: UpdateWriteOpResult = await query.exec();

            (data.modifiedCount)
                ? callback(msgSuccess)
                : callback(msgErrUpdVoid)

        } catch (error) {
            console.error("\tPROCESS_BINDING_ERROR\n");
            callback(msgErrUnexpected);
        }
    }
}

function unbindProcess() {
    return async (req: Request & IBindingProcessUser, callback: Function) => {
        console.log("\tPROCESS_UNBINDING\n");

        try {
            const ProcessModel = model('Process');
            const query = ProcessModel.updateOne({ _id: req.body.ProcessId }, { $pull: { '_userList': req.body.institutionId } });

            const data: UpdateWriteOpResult = await query.exec();

            (data.modifiedCount)
                ? callback(msgSuccess)
                : callback(msgErrUpdVoid)

        } catch (error) {
            console.error("\tPROCESS_UNBINDING_ERROR\n");
            callback(msgErrUnexpected);
        }
    }
}

function update() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tPROCESS_UPDATE\n");

        const id = req.params._id || req.body.id;

        try {
            const ProcessModel = model('Process');
            const query = ProcessModel.updateOne({ _id: id }, req.body);

            const data: UpdateWriteOpResult = await query.exec();

            (data.modifiedCount)
                ? callback(msgSuccess)
                : callback(msgErrUpdVoid)

        } catch (error) {
            console.error("\tPROCESS_UPDATE_ERROR\n");
            callback(msgErrUnexpected);
        }
    }
}

function remove() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tPROCESS_DELETE\n");

        const id = req.params._id || req.body.id;

        try {
            const ProcessModel = model('Process');
            const query = ProcessModel.deleteOne({ _id: id }, req.body);

            const data: DeleteResult = await query.exec();

            (data.deletedCount)
                ? callback(msgSuccess)
                : callback(msgErrRemVoid)

        } catch (error) {
            console.error("\tPROCESS_DELETE_ERROR\n");
            callback(msgErrUnexpected);
        }
    }
}

function counter() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tPROCESS_COUNT\n");

        const filter = req.body || {};

        try {
            const ProcessModel = model('Process');
            const query = ProcessModel.count(filter);

            const data = await query.exec();
            callback(data);

        } catch (error) {
            console.error("\tPROCESS_COUNT_ERROR\n");
            callback(msgErrUnexpected);
        }
    }
}