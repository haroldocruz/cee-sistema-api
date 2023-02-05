// dev-local | dev-local-docker | dev-remote-atlas
var env = "dev-remote-atlas"

const local = {
    protocol: 'mongodb://',
    user: '',
    password: '',
    address: 'localhost',
    port: ':' + '27017',
    dbName: '/' + 'ceesistema',
    params: ''
}

const docker = {
    protocol: 'mongodb://',
    // user: 'admin',
    // password: ':' + 'GE0xJoamuF4y' + '@',
    user: '',
    password: '',
    address: 'cee-sistema-data',
    port: ':' + '27017',
    dbName: '/' + 'ceesistema',
    params: ''
}

const atlas = {
    protocol: 'mongodb+srv://',
    user: 'ceesistema',
    password: ':' + 'c33s1st3m4' + '@',
    address: 'cluster0.yejqb.mongodb.net',
    port: '',
    dbName: '/' + 'ceesistema',
    params: '?' + 'retryWrites=true&w=majority'
}


const conn = (env === "dev-remote-atlas")
    ? atlas
    : (env === "dev-local-docker")
        ? docker
        : (env === "dev-local")
            ? local : local;

export const URI = `${conn.protocol}${conn.user}${conn.password}${conn.address}${conn.port}${conn.dbName}${conn.params}`;
