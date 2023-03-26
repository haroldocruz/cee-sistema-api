import { Request } from "express";
import { model } from 'mongoose';
import { IAuth } from "../../../authServices";
import { IAPIResponse } from "../../../models/ApiResponse";
import { IAvaliador } from '../../../models/Avaliador';
import { msgErrFind, msgErrUnexpected } from "../../../utils/messages";

export interface IAvaliadorCtrl {
    'getAll': (request: Request & IAuth, callback: (response: IAPIResponse<IAvaliador[]>) => void) => any;
}

export class AvaliadorConsultarUsecase {

    getAll() {
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
}