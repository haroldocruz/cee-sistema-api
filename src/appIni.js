import { model } from "mongoose";
import Crypt from "./utils/security/cryptograph";
import Moment from "moment";

module.exports = async function (app) {

    if (!await model('user').exists()) {
        await createRouteList();
        await createFirstProfile();
        await createFirstUser();
    }
}

async function createRouteList() {
    
    if (await model('route').exists()) await model('route').remove();

    const routeList = [
        { "context": "system", "status": true, "urn": "GET/user/", "description": "" },
        { "context": "system", "status": true, "urn": "GET/user/:id", "description": "" },
        { "context": "system", "status": true, "urn": "POST/user/", "description": "" },
        { "context": "system", "status": true, "urn": "PUT/user/:id", "description": "" },
        { "context": "system", "status": true, "urn": "DELETE/user/:id", "description": "" },
        { "context": "system", "status": true, "urn": "POST/user/filter", "description": "" },
        { "context": "system", "status": true, "urn": "POST/user/counter", "description": "" },
        { "context": "system", "status": true, "urn": "POST/auth/logout", "description": "" }
    ]

    await model('route').insertMany(routeList)

    // routeList.forEach(element => {
    //     await model('route').create(element);
    // });
}

async function createFirstProfile() {
    
    if (await model('profile').exists()) await model('route').remove();

    const routeList = await model('route').find();
    console.log(routeList)

    const profileList = [
        {
            "status": true,
            "name": "Super Usuário",
            "context": "system",
            // "scope": {},
            // "group": {},
            "description": "The superuser is a special user account used for system administration",
            "routeList": routeList
        }, {
            "status": true,
            "name": "Administrador",
            "context": "cee",
            // "scope": {},
            // "group": {},
            "description": "The Administrator is a user account used for main specifications of the system administration",
            "routeList": routeList
        }, {
            "status": true,
            "name": "Gerente",
            "context": "cee",
            // "scope": {},
            // "group": {},
            "description": "O Gerente é um ...",
            "routeList": routeList
        }, {
            "status": true,
            "name": "Procurador Institucional",
            "context": "ie/ue",
            // "scope": {},
            // "group": {},
            "description": "O Procurador Institucional ...",
            "routeList": routeList
        }];

        await model('profile').insertMany(profileList)

    // for (let i = 0; i < profiles.length; i++)
    //     await model('profile').create(profileList[i]);
}

async function createFirstUser() {

    const profileList = await model('profile').find();
    console.log(profileList)

    const userList = [{
        "status": true,
        "name": "Super User",
        "cpf": "12345678909",
        "gender": "Não informado",
        "maritalStatus": "Não informado",
        "birthDate": Moment.utc('1985-10-29'),
        "contact": {
            "emailList": [{ "address": "super@super.com" }],
            "phoneList": [{ "number": 5563984589691 }],
            "addressList": [{ "country": "Brasil", "state": "Tocantins", "zipcode": 77062060 }]
        },
        "dataAccess": {
            "password": "12345678909",
            "passwordHash": await Crypt.createHash("12345678909"),
            "profileDefault": profileList[0]._id,
            "profileList": profileList,
        },
    }, {
        "status": true,
        "name": "Administrador CEE",
        "cpf": "01234567890",
        "gender": "Não informado",
        "maritalStatus": "Não informado",
        "birthDate": Moment.utc('1985-10-29'),
        "contact": {
            "emailList": [{ "address": "admin@admin.com" }],
            "phoneList": [{ "number": 5563984589691 }],
            "addressList": [{ "country": "Brasil", "state": "Tocantins", "zipcode": 77062060 }]
        },
        "dataAccess": {
            "password": "01234567890",
            "passwordHash": await Crypt.createHash("01234567890"),
            "profileDefault": profileList[1]._id,
            "profileList": profileList,
        },
    }];

    await model('user').insertMany(userList, function (error, docs) {
        if (error) console.log("USERS ERRORRRRR"+error) //! APAGAR
        else console.log("USERS INSERTED SUCCESSFUL") //! APAGAR
     });

    //  await model('profile').updateMany({}, {_userList: })

    // const userModel = new model('user');
    // userModel(user).save();
}
