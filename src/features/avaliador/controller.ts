import { model, UpdateWriteOpResult } from 'mongoose';
import { Request } from "express";
import { IAuth } from "../../authServices";
import { IStatusMessage, msgErrFind, msgErrRemVoid, msgErrUnexpected, msgErrUpdVoid, msgSuccess } from "../../utils/messages";
import { IAvaliador } from '../../models/Avaliador';
import item from './model';
import { DeleteResult } from 'mongoose/node_modules/mongodb';

export interface IAvaliadorCtrl {
    'getOne': (request: Request & IAuth, callback: (response: IStatusMessage & IAvaliador) => void) => any;
    'getAll': (request: Request & IAuth, callback: (response: IStatusMessage & IAvaliador[]) => void) => any;
    'save': (request: Request & IAuth, callback: (response: IStatusMessage) => void) => any;
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
        'update': update(),
        'remove': remove(),
        'counter': counter()
    }
}

function getOne() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tAVALIADOR_READ_ONE\n");

        const id = req.params._id || req.body.id;

        try {
            const query = model('avaliador').findOne({ '_id': id });

            let data = await query.exec();
            (data)
                ? callback(data)
                : callback(msgErrFind)
        }
        catch (error) {
            console.error("\tAVALIADOR_READ_ONE_ERROR\n", error);
            callback(msgErrUnexpected);
        }
    }
}

function getAll() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tAVALIADOR_READ_ALL\n");

        const filter = req.body || {};

        try {
            const ItemModel = model('avaliador');
            const query = ItemModel.find(filter);

            let data = await query.exec();
            (data)
                ? callback(data)
                : callback(msgErrFind)
        }
        catch (error) {
            console.error("\tAVALIADOR_READ_ALL_ERROR\n", error);
            callback(msgErrUnexpected);
        }
    }
}

function save() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tAVALIADOR_CREATE\n")

        const ItemModel = model('avaliador');
        let newItem = <IAvaliador>new ItemModel(req.body);
        if (!newItem.__metadata)
            newItem.__metadata = {}

        newItem.__metadata._createdBy = req.userId;
        newItem.__metadata.createdAt = new Date();

        try {
            const queryData = await newItem.save();
            callback(msgSuccess);

        } catch (error) {
            console.error("\tAVALIADOR_CREATE_ERROR\n");
            callback(msgErrUnexpected);
        }
    }
}

function update() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tAVALIADOR_UPDATE\n");

        const id = req.params._id || req.body.id;

        try {
            const AvaliadorModel = model('Avaliador');
            const query = AvaliadorModel.updateOne({ _id: id }, req.body);

            const data: UpdateWriteOpResult = await query.exec();

            (data.modifiedCount)
                ? callback(msgSuccess)
                : callback(msgErrUpdVoid)

        } catch (error) {
            console.error("\tAVALIADOR_UPDATE_ERROR\n");
            callback(msgErrUnexpected);
        }
    }
}

function remove() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tAVALIADOR_DELETE\n");

        const id = req.params._id || req.body.id;

        try {
            const AvaliadorModel = model('Avaliador');
            const query = AvaliadorModel.deleteOne({ _id: id }, req.body);

            const data: DeleteResult = await query.exec();

            (data.deletedCount)
                ? callback(msgSuccess)
                : callback(msgErrRemVoid)

        } catch (error) {
            console.error("\tAVALIADOR_DELETE_ERROR\n");
            callback(msgErrUnexpected);
        }
    }
}

function counter() {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tAVALIADOR_COUNT\n");

        const filter = req.body || {};

        try {
            const AvaliadorModel = model('Avaliador');
            const query = AvaliadorModel.count(filter);

            const data = await query.exec();
            callback(data);

        } catch (error) {
            console.error("\tAVALIADOR_COUNT_ERROR\n");
            callback(msgErrUnexpected);
        }
    }
}