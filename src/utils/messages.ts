
export interface IStatusMessage {
    statusCode: number;
    statusMessage: string;
}

//CONNECTION
export const msgErrConn = { statusCode: 502, statusMessage: 'Erro ao tentar conectar'};
//LOGIN
export const msgErrUsername = { statusCode: 406, statusMessage: 'Email ou CPF inválido'};
export const msgErrUserAbsent = { statusCode: 406, statusMessage: 'Usuário não cadastrado'};
export const msgErrUserDeactived = { statusCode: 406, statusMessage: 'Usuário desativado. Por favor, entre em contato com a administração'};
export const msgErrPass = { statusCode: 406, statusMessage: 'Senha inválida'};
export const msgErrLogin = { statusCode: 400, statusMessage: 'Erro ao tentar fazer login'};
export const msgErrLowLevel = { statusCode: 403, statusMessage: "Necessário elevar seu nível de acesso para realizar esta ação"};
export const msgErrNoAuth = { statusCode: 401, statusMessage: "Somente usuários autenticados podem realizar esta ação"};
//CONNECT
export const msgErrTokenOrUser = { statusCode: 400, statusMessage: 'Problema com seu token ou usuário'};
export const msgErrToken = { statusCode: 400, statusMessage: 'Token inválido ou expirado'};
export const msgErrNoToken = { statusCode: 401, statusMessage: 'Acesso restrito'};
//CREATE
export const msgErrMailExist = { statusCode: 400, statusMessage: 'Email já cadastrado'};
export const msgErrSave = { statusCode: 400, statusMessage: 'Erro ao tentar salvar'};
//READ
export const msgErrFind = { statusCode: 204, statusMessage: 'Nenhum dado encontrado'};
export const msgErr5xx = { statusCode: 500, statusMessage: 'Algo ruim aconteceu. Contacte o administrador do sistema'};
//UPDATE
export const msgErrUpd = { statusCode: 400, statusMessage: 'Erro ao tentar atualizar'};
export const msgErrUpdVoid = { statusCode: 400, statusMessage: 'Nada foi modificado'};
//DELETE
export const msgErrRem = { statusCode: 400, statusMessage: 'Erro ao tentar remover'};
export const msgErrRemVoid = { statusCode: 400, statusMessage: 'Nada foi removido'};
//OTHERS
export const msgErrUnexpected = { statusCode: 503, statusMessage: 'Erro não esperado no servidor'};
export const msgErrDenied = { statusCode: 403, statusMessage: 'Permissão negada'};
export const msgErrNoData = { statusCode: 204, statusMessage: 'Nenhum dado enviado'};
export const msgErrNoPermission = { statusCode: 403, statusMessage: 'Usuário não autorizado a realizar esta operação'};
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