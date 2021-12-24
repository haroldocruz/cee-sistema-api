import { Model, CastError, model, UpdateWriteOpResult } from "mongoose";
import { Request } from "express";
import { IUser, IUserBase } from './../../models/User';
import item from "./model";
import { msgErrConn, msgErrFind, msgErrRem, msgErrSave, msgErrUnexpected, msgErrUpd, msgErrUpdVoid, msgSuccess } from '../../utils/messages';
import { IAuth } from "../../authServices";
import { IQueryConfig } from "../../models/IQueryConfig";

export interface IUserCtrl {
    // 'changeProfile': (arg0: Request & IAuth, callback: any) => any;
    'getOne': (arg0: Request & IAuth, callback: any) => any;
    'getAll': (arg0: Request & IAuth, callback: any) => any;
    'save': (arg0: Request & IAuth, callback: any) => any;
    'update': (arg0: Request & IAuth, callback: any) => any;
    'remove': (arg0: Request & IAuth, callback: any) => any;
    'filterOne': (arg0: Request & IAuth, callback: any) => any;
    'filterAll': (arg0: Request & IAuth, callback: any) => any;
    'counter': (arg0: Request & IAuth, callback: any) => any;
}

export default function (itemName: string) {

    const ItemModel = item(itemName);

    return {
        // 'changeProfile': fnChangeProfile(ItemModel),
        'getOne': getOne(ItemModel),
        'getAll': getAll(ItemModel),
        'save': save(ItemModel),
        'update': update(ItemModel),
        'remove': remove(ItemModel),
        'filterOne': filterOne(),
        'filterAll': filterAll(),
        'counter': fnCounter(ItemModel)
    }
}

function isValidAccessLevel(accessLevel: string, list: Array<string>) {
    return list.includes(accessLevel);
}

// function fnChangeProfile(User: Model<IUser>) {
//     return []
// }


function getOne(ItemModel: Model<IUser>) {
    return (req: Request & IAuth, callback: Function) => {
        console.log("\tUSER_READ_ONE\n")

        ItemModel.findOne({ '_id': req.params.id }, (error: any, data: any) => { (error || !data) ? callback(msgErrFind) : callback(data) })
        // .populate({ path: '_indicator', populate: { path: '_critery' } })
    }
}

function getAll(ItemModel: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tUSER_READ_ALL\n")


        try {
            const UserModel = model('user');
            const query = UserModel.find({});

            callback(await query.exec());
        }
        catch (error) {
            console.error("\tUSER_READ_ALL_ERROR\n", error);
            callback(msgErrUnexpected);
        }


        // ItemModel.find({}, (error: any, resp: any) => { (error || !resp) ? callback(msgErrFind) : callback(resp) })
        //     .populate({ path: 'dataAccess._profileList' })
        //     // .select('groups')
        //     .sort('order')
    }
}

function save(ItemModel: Model<IUser>) {
    return async (req: Request, callback: Function) => {
        console.log("\tUSER_CREATE\n")

        var newItem = new ItemModel(req.body);
        await newItem.save(function (error: CastError) {
            (error) ? (() => { callback(msgErrSave); console.log(error) })() : callback(msgSuccess)
        });

    }
}

function update(ItemModel: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tUSER_UPDATE\n")

        const id = req.body._id || req.params.id;

        try {
            const UserModel = model('user');
            const query = UserModel.updateOne({ '_id': id }, req.body);

            const data: UpdateWriteOpResult = await query.exec();

            (data.modifiedCount)
                ? callback(msgSuccess)
                : callback(msgErrUpdVoid)
        }
        catch (error) {
            console.log("\tUSER_UPDATE_ERROR\n", error);
            callback(msgErrUpd);
        }
    }
}

function remove(ItemModel: any) {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tUSER_DELETE\n")

        await ItemModel.deleteOne({ '_id': req.params.id }, function (error: any, data) {
            (error) ? callback(msgErrRem) : (data.deletedCount == 0) ? callback(msgErrFind) : callback(msgSuccess);
        });
    }
}

function fnCounter(User: Model<IUser>) {
    return (req: Request & IAuth, callback: Function) => {
        User.countDocuments(req.body).exec((error, data) => {
            (error || !!data) ? console.log(msgErrConn) : callback(data)
        });
    }
}

function filterOne() {
    return async (req: Request & IUser, callback: Function) => {
        console.log("\tUSER_FILTER_ONE");

        const user: IUserBase = req.body.filter;
        const config: IQueryConfig = req.body.queryConfig;

        const UserModel = model('user');
        const query = UserModel.findOne(user);

        config.populateList.forEach((e) => {
            query.populate({ path: e.path, select: e.select })
        })

        try {
            const data = <IUser>await query.exec();
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
    return async (req: Request & IUser, callback: Function) => {
        console.log("\tUSER_FILTER_ALL");

        const user: IUserBase = req.body.filter;
        const config: IQueryConfig = req.body.queryConfig;

        const UserModel = model('user');
        const query = UserModel.find(user);

        config.populateList.forEach((e) => {
            query.populate({ path: e.path, select: e.select })
        })

        try {
            const data = <IUser[]>await query.exec();
            if (data.length === 0) { callback(msgErrFind); return; }
            callback(data);
        }
        catch (error) {
            console.log("ERROR: ", error);
            callback(msgErrUnexpected);
        }
        // var AddressModel = require('mongoose').model('address');
        // var VacancyModel = require('mongoose').model('vacancy');
        // var address = AddressModel.find({
        //     "city": { "$regex": reqDataFilter.address.city, "$options": "i" },
        //     "uf": { "$regex": reqDataFilter.address.uf, "$options": "i" }
        // });
        // var vacancy = VacancyModel.find({
        //     "office": { "$regex": reqDataFilter.vacancy.office, "$options": "i" }
        // });
        // UserModel.find({})
        // .populate('professionalExperience')
        // UserModel.find({ "name": { "$regex": reqDataFilter.user.name, "$options": "i" } })
        //     // .populate({
        //     //     path: 'vacancy', model: 'vacancy', match: {
        //     //         "office": { "$regex": reqDataFilter.vacancy.office, "$options": "i" }
        //     //     }
        //     // })
        //     // .populate({
        //     //     path: 'address', model: 'address', match: {
        //     //         "city": { "$regex": reqDataFilter.address.city, "$options": "i" },
        //     //         "uf": { "$regex": reqDataFilter.address.uf, "$options": "i" }
        //     //     }
        //     // })
        //     .populate('professionalExperience')
        //     .populate('vacancy')
        //     .populate('address')
        //     // .where("name", /^haroldo/i)
        //     .sort("name")
        //     .exec((error: any, data: any) => {
        //         if (error) {
        //             console.log("ERRO: " + error);
        //             callback(msgErrConn);
        //         }
        //         else if (data.length === 0)
        //             callback(msgErrFind);
        //         else {
        //             var data2: any;
        //             if (reqDataFilter.vacancy !== undefined && data[0].vacancy !== undefined) {
        //                 var data2 = data;
        //                 if (util.invalidField(reqDataFilter.vacancy.office))
        //                     data = data2.filter((item: any) => {
        //                         if (item.vacancy.office)
        //                             return (item.vacancy.office.toLowerCase().indexOf(reqDataFilter.vacancy.office.toLowerCase()) !== -1) ? true : false;
        //                     });
        //                 if (data.length === 0) {
        //                     callback(msgErrFind);
        //                     return;
        //                 }
        //             }
        //             if (reqDataFilter.address !== undefined && data[0].address !== undefined) {
        //                 data2 = data;
        //                 if (util.invalidField(reqDataFilter.address.city))
        //                     data = data2.filter((item: any) => {
        //                         if (item.address.city)
        //                             return (item.address.city.toLowerCase().indexOf(reqDataFilter.address.city.toLowerCase()) !== -1) ? true : false;
        //                     });
        //                 if (data.length === 0) {
        //                     callback(msgErrFind);
        //                     return;
        //                 }
        //                 data2 = data;
        //                 if (util.invalidField(reqDataFilter.address.uf))
        //                     data = data2.filter((item: any) => {
        //                         if (item.address.uf)
        //                             return (item.address.uf.toLowerCase().indexOf(reqDataFilter.address.uf.toLowerCase()) !== -1) ? true : false;
        //                     });
        //                 if (data.length === 0) {
        //                     callback(msgErrFind);
        //                     return;
        //                 }
        //             }
        //             callback(data);
        //         }
        //     });
    };
}