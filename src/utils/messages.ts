
export interface IStatusMessage {
    statusCode: number;
    statusMessage: string;
}

//CONNECTION
export const errConn = { statusCode: 502, statusMessage: 'Erro ao tentar conectar'};
//LOGIN
export const errUsername = { statusCode: 406, statusMessage: 'Email ou CPF inválido'};
export const errUserAbsent = { statusCode: 406, statusMessage: 'Usuário não cadastrado'};
export const errUserDeactived = { statusCode: 406, statusMessage: 'Usuário desativado. Por favor, entre em contato com a administração'};
export const errPass = { statusCode: 406, statusMessage: 'Senha inválida'};
export const errLogin = { statusCode: 400, statusMessage: 'Erro ao tentar fazer login'};
export const errLowLevel = { statusCode: 403, statusMessage: "Necessário elevar seu nível de acesso para realizar esta ação"};
export const errNoAuth = { statusCode: 401, statusMessage: "Somente usuários autenticados podem realizar esta ação"};
//CONNECT
export const errTokenOrUser = { statusCode: 400, statusMessage: 'Problema com seu token ou usuário'};
export const errToken = { statusCode: 400, statusMessage: 'Token inválido ou expirado'};
export const errNoToken = { statusCode: 401, statusMessage: 'Acesso restrito'};
//CREATE
export const errMailExist = { statusCode: 400, statusMessage: 'Email já cadastrado'};
export const errSave = { statusCode: 400, statusMessage: 'Erro ao tentar salvar'};
//READ
export const errFind = { statusCode: 204, statusMessage: 'Nenhum dado encontrado'};
//UPDATE
export const errUpd = { statusCode: 400, statusMessage: 'Erro ao tentar atualizar'};
export const errUpdVoid = { statusCode: 400, statusMessage: 'Nada foi modificado'};
//DELETE
export const errRem = { statusCode: 400, statusMessage: 'Erro ao tentar remover'};
//OTHERS
export const errDenied = { statusCode: 403, statusMessage: 'Permissão negada'};
export const errNoData = { statusCode: 204, statusMessage: 'Nenhum dado enviado'};
export const errNoPermission = { statusCode: 403, statusMessage: 'Usuário não autorizado a realizar esta operação'};
export const msgSuccess = { statusCode: 200, statusMessage: 'Ação realizada com sucesso'}

// export default {
//     //CONNECTION
//     errConn,
//     //LOGIN
//     errUserAbsent,
//     errPass,
//     errLogin,
//     errLowLevel,
//     errNoAuth,
//     //CONNECT
//     errTokenOrUser,
//     errToken,
//     errNoToken,
//     //CREATE
//     errMailExist,
//     errSave,
//     //READ
//     errFind,
//     //UPDATE
//     errUpd,
//     //DELETE
//     errRem,
//     //OTHERS
//     errNoData,
//     errNoPermission,
//     msgSuccess
// }