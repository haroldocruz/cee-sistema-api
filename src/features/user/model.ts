// import { Model, Document } from "mongoose";
// import DB from "../../db/dbConnect";
// import { User, IUser } from './../../models/User';
import Crypt from "./../../utils/security/cryptograph";

// export default function (itemName: string) {
//     const itemSchema = new DB.Schema(User, { collection: itemName });

//     itemSchema.pre('save', async function () {
//         const User = <IUser> this;
//         if (User.dataAccess?.password) {
//             User.dataAccess.passwordHash = await Auth.createHash(User.dataAccess.password);
//             // delete User.dataAccess.password;
//         }
//         if (User.groups) {
//             User.groupsHash = await Auth.generateToken(User.groups);
//             // delete User.groups;
//         }
//     })

//     return DB.model<IUser>(itemName, itemSchema, itemName);
// }

import { Model } from "mongoose";
import DB from "../../db/dbConnect";
import { IUser, User } from "./../../models/User";

export default function (itemName: string): Model<IUser> {

    const itemSchema = new DB.Schema(User, { collection: itemName });
    
    preSaveOrUpdatePasswordHash(itemSchema);
    // preSaveGroupsCrypt(itemSchema);

    return DB.model<IUser>(itemName, itemSchema, itemName);
}

function preSaveOrUpdatePasswordHash(itemSchema) {
    itemSchema.pre(['save', /update/i], async function () {
        
        const User = (this.getUpdate) ? <IUser>this.getUpdate() : <IUser>this;
        
        if (User.dataAccess?.password) {
            User.dataAccess.passwordHash = await Crypt.createHash(User.dataAccess.password);
            User.dataAccess.password = undefined;
            delete User.dataAccess.password;
        }
    });
}

// function preSaveGroupsCrypt(itemSchema) {
//     itemSchema.pre('save', function () {
//         const User = <IUser>this;
//         if (User.dataAccess.groups) {
//             User.dataAccess.groupsCrypt = Crypt.encodeTextAES(JSON.stringify(User.dataAccess.groups));
//             User.dataAccess.groups = undefined;
//         }
//     });
// }