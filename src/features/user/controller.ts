import { Model, Document, CastError } from "mongoose";
import { DeleteWriteOpResultObject } from "mongodb";
import { Request } from "express";
import { IUser } from './../../models/User';
import item from "./model";
import * as MSG from '../../utils/messages';
import { IAuth } from "../../authServices";
const util = require('../../utils/util');
// var metadata = require('../metadata/metadataCtrl')

export interface IUserCtrl {
    // 'changeProfile': (arg0: Request & IAuth, callback: any) => any;
    'getOne': (arg0: Request & IAuth, callback: any) => any;
    'getAll': (arg0: Request & IAuth, callback: any) => any;
    'save': (arg0: Request & IAuth, callback: any) => any;
    'update': (arg0: Request & IAuth, callback: any) => any;
    'remove': (arg0: Request & IAuth, callback: any) => any;
    'allFilter': (arg0: Request & IAuth, callback: any) => any;
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
        'allFilter': fnAllFilter(),
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

        ItemModel.findOne({ '_id': req.params.id }, (error: any, data: any) => { (error || !data) ? callback(MSG.errFind) : callback(data) })
        // .populate({ path: '_indicator', populate: { path: '_critery' } })
    }
}

function getAll(ItemModel: Model<IUser>) {
    return (req: Request & IAuth, callback: Function) => {
        console.log("\tUSER_READ_ALL\n")

        ItemModel.find({}, (error: any, resp: any) => { (error || !resp) ? callback(MSG.errFind) : callback(resp) })
            .populate({ path: 'dataAccess.profileList' })
            // .select('groups')
            .sort('order')
    }
}

function save(ItemModel: Model<IUser>) {
    return async (req: Request, callback: Function) => {
        console.log("\tUSER_CREATE\n")

        var newItem = new ItemModel(req.body);
        await newItem.save(function (error: CastError) {
            (error) ? (() => { callback(MSG.errSave); console.log(error) })() : callback(MSG.msgSuccess)
        });

    }
}

function update(ItemModel: Model<IUser>) {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tUSER_UPDATE\n")

        const id = req.body._id || req.params.id;
        await ItemModel.updateOne({ '_id': id }, req.body, {}, (error: any, data: any) => {
            // console.log(data);
            (error) ? (() => { callback(MSG.errUpd); console.log(error) })() : (data.nModified) ? callback(MSG.msgSuccess) : callback(MSG.errUpdVoid)
        });

        // metadata.update(req.metadata, req.userId);
        // }
    }
}

function remove(ItemModel: any) {
    return async (req: Request & IAuth, callback: Function) => {
        console.log("\tUSER_DELETE\n")

        await ItemModel.deleteOne({ '_id': req.params.id }, function (error: any, data: DeleteWriteOpResultObject) {
            (error) ? callback(MSG.errRem) : (data.deletedCount == 0) ? callback(MSG.errFind) : callback(MSG.msgSuccess);
        });
    }
}

function fnCounter(User: Model<IUser>) {
    return (req: Request & IAuth, callback: Function) => {
        User.countDocuments(req.body).exec((error, data) => {
            (error || !!data) ? console.log(MSG.errConn) : callback(data)
        });
    }
}

function fnAllFilter() {
    return (reqDataFilter: any, callback: Function) => {
        console.log("\tUSER_ALL_FILTER -> " + JSON.stringify(reqDataFilter));
        var UserModel = require('mongoose').model('user');
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
        UserModel.find({ "name": { "$regex": reqDataFilter.user.name, "$options": "i" } })
            // .populate({
            //     path: 'vacancy', model: 'vacancy', match: {
            //         "office": { "$regex": reqDataFilter.vacancy.office, "$options": "i" }
            //     }
            // })
            // .populate({
            //     path: 'address', model: 'address', match: {
            //         "city": { "$regex": reqDataFilter.address.city, "$options": "i" },
            //         "uf": { "$regex": reqDataFilter.address.uf, "$options": "i" }
            //     }
            // })
            .populate('professionalExperience')
            .populate('vacancy')
            .populate('address')
            // .where("name", /^haroldo/i)
            .sort("name")
            .exec((error: any, data: any) => {
                if (error) {
                    console.log("ERRO: " + error);
                    callback(MSG.errConn);
                }
                else if (data.length === 0)
                    callback(MSG.errFind);
                else {
                    var data2: any;
                    if (reqDataFilter.vacancy !== undefined && data[0].vacancy !== undefined) {
                        var data2 = data;
                        if (util.invalidField(reqDataFilter.vacancy.office))
                            data = data2.filter((item: any) => {
                                if (item.vacancy.office)
                                    return (item.vacancy.office.toLowerCase().indexOf(reqDataFilter.vacancy.office.toLowerCase()) !== -1) ? true : false;
                            });
                        if (data.length === 0) {
                            callback(MSG.errFind);
                            return;
                        }
                    }
                    if (reqDataFilter.address !== undefined && data[0].address !== undefined) {
                        data2 = data;
                        if (util.invalidField(reqDataFilter.address.city))
                            data = data2.filter((item: any) => {
                                if (item.address.city)
                                    return (item.address.city.toLowerCase().indexOf(reqDataFilter.address.city.toLowerCase()) !== -1) ? true : false;
                            });
                        if (data.length === 0) {
                            callback(MSG.errFind);
                            return;
                        }
                        data2 = data;
                        if (util.invalidField(reqDataFilter.address.uf))
                            data = data2.filter((item: any) => {
                                if (item.address.uf)
                                    return (item.address.uf.toLowerCase().indexOf(reqDataFilter.address.uf.toLowerCase()) !== -1) ? true : false;
                            });
                        if (data.length === 0) {
                            callback(MSG.errFind);
                            return;
                        }
                    }
                    callback(data);
                }
            });
    };
}