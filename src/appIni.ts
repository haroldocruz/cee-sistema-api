import { model } from "mongoose";
import Crypt from "./utils/security/cryptograph";
import Moment from "moment";
import { ContextEnum } from "./models/enumerations/ContextEnum";
import { IBindInInstitution, IInstitutionBase } from "./models/Institution";
import { InstitutionTypeEnum } from "./models/enumerations/InstitutionTypeEnum";
import { AdministrativeSphereEnum } from "./models/enumerations/administrativeSphereEnum";
import { IMemberBase as IMemberBind } from "./models/Member";
import { IBindInUser } from "./models/User";

module.exports = async function (app) {

    if (!await model('user').exists({})) {
        await createRouteList();
        await createFirstProfile();
        await createFirstUser();
        await createFirstInstitution();
    }
}

async function createRouteList() {

    if (await model('route').exists({})) await model('route').remove();

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

    await model('route').insertMany(routeList);
}

async function createFirstProfile() {

    if (await model('profile').exists({})) await model('profile').remove();

    const routeList = await model('route').find();

    const profileList = [
        {
            "status": true,
            "name": "Super Usuário",
            "context": ContextEnum.SYSTEM,
            // "scope": {},
            // "group": {},
            "description": "The superuser is a special user account used for system administration",
            "_routeList": routeList,
            "_userList": [],
        }, {
            "status": true,
            "name": "Administrador",
            "context": ContextEnum.CEE,
            // "scope": {},
            // "group": {},
            "description": "The Administrator is a user account used for main specifications of the system administration",
            "_routeList": routeList,
            "_userList": [],
        }, {
            "status": true,
            "name": "Gerente",
            "context": ContextEnum.CEE,
            // "scope": {},
            // "group": {},
            "description": "O Gerente é um ...",
            "_routeList": routeList,
            "_userList": [],
        }, {
            "status": true,
            "name": "Procurador Institucional",
            "context": ContextEnum.IE_UE,
            // "scope": {},
            // "group": {},
            "description": "O Procurador Institucional ...",
            "_routeList": routeList,
            "_userList": [],
        }];

    await model('profile').insertMany(profileList);
}

async function createFirstUser() {

    if (await model('user').exists({})) await model('user').remove();

    const profileList = await model('profile').find();

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
            "bindDefault": undefined,
            "bindList": undefined,
            // "_profileDefault": profileList[0]._id,
            // "_profileList": profileList,
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
            "bindDefault": undefined,
            "bindList": undefined,
            // "_profileDefault": profileList[1]._id,
            // "_profileList": profileList,
        },
    }];

    await model('user').insertMany(userList);
}

async function createFirstInstitution() {

    if (await model('institution').exists({})) await model('institution').remove();

    const queryProfile = await model('profile').findOne({ context: ContextEnum.CEE });
    const queryUser = await model('user').findOne({ "name": "Administrador CEE" });

    const institution: IInstitutionBase = {
        "status": true,
        "context": ContextEnum.CEE,
        institutionType: InstitutionTypeEnum.PUBLIC_ADM,
        administrativeSphere: AdministrativeSphereEnum.PUBLIC_E,
        "name": "Conselho Estadual de Educação do Tocantins",
        "contact": {
            "emailList": [{ "address": "conseduc@seduc.to.gov.br" }],
            "phoneList": [{ "number": 556332186221, "description": "Geral" }],
            "addressList": [{ "country": "Brasil", "state": "Tocantins", "zipcode": 77000000 }]
        },
        // memberList: [{
        //     status: true,
        //     _profile: queryProfile._id,
        //     _user: queryUser._id
        // }]
    };


    const queryInstitution = await model('institution').create(institution);

    const updateUser: IMemberBind = {
        status: true,
        context: ContextEnum.CEE,
        _user: queryUser.get('_id'),
        userName: queryUser.get('name'),
        _institution: queryInstitution.get('_id'),
        institutionName: queryInstitution.get('name'),
        _profile: queryProfile.get('_id'),
        profileName: queryProfile.get('name'),
    }

    bindingMember(updateUser)

    // await queryUser.updateOne({ $push: { "dataAccess.bindList": [updateUser] } }).exec();
}

async function bindingMember(update: IMemberBind) {
    console.log("\tINSTITUTION_MEMBER_BINDING2\n");

    const reqBindingMember: IMemberBind = update;
    const bindInInstitution: IBindInInstitution = reqBindingMember;
    const bindInUser: IBindInUser = reqBindingMember;

    const InstitutionModel = model('institution');
    await InstitutionModel.updateOne({ _id: reqBindingMember._institution }, { $push: { 'memberList': [bindInInstitution] } })

    const UserModel = model('user');
    await UserModel.updateOne({ _id: reqBindingMember._user }, { $push: { 'dataAccess.bindList': [bindInUser] } });
    
}
