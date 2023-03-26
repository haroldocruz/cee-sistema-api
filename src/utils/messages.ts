
export interface IStatusMessage {
    statusCode: number;
    statusMessage: string;
}

//CONNECTION
export const msgErrConn: IStatusMessage = { statusCode: 502, statusMessage: 'Erro ao tentar conectar' };
//LOGIN
export const msgErrUsername: IStatusMessage = { statusCode: 406, statusMessage: 'Email ou CPF inválido' };
export const msgErrUserAbsent: IStatusMessage = { statusCode: 406, statusMessage: 'Usuário não cadastrado' };
export const msgErrUserDeactived: IStatusMessage = { statusCode: 406, statusMessage: 'Usuário desativado. Por favor, entre em contato com a administração' };
export const msgErrPass: IStatusMessage = { statusCode: 406, statusMessage: 'Senha inválida' };
export const msgErrLogin: IStatusMessage = { statusCode: 400, statusMessage: 'Erro ao tentar fazer login' };
export const msgErrLowLevel: IStatusMessage = { statusCode: 403, statusMessage: "Necessário elevar seu nível de acesso para realizar esta ação" };
export const msgErrNoAuth: IStatusMessage = { statusCode: 401, statusMessage: "Somente usuários autenticados podem realizar esta ação" };
//CONNECT
export const msgErrTokenOrUser: IStatusMessage = { statusCode: 400, statusMessage: 'Problema com seu token ou usuário' };
export const msgErrToken: IStatusMessage = { statusCode: 400, statusMessage: 'Token inválido ou expirado' };
export const msgErrNoToken: IStatusMessage = { statusCode: 401, statusMessage: 'Acesso restrito' };
//CREATE
export const msgErrMailExist: IStatusMessage = { statusCode: 400, statusMessage: 'Email já cadastrado' };
export const msgErrSave: IStatusMessage = { statusCode: 400, statusMessage: 'Erro ao tentar salvar' };
//READ
export const msgErrFind: IStatusMessage = { statusCode: 204, statusMessage: 'Nenhum dado encontrado' };
export const msgErr5xx: IStatusMessage = { statusCode: 500, statusMessage: 'Algo ruim aconteceu. Contacte o administrador do sistema' };
//UPDATE
export const msgErrUpd: IStatusMessage = { statusCode: 400, statusMessage: 'Erro ao tentar atualizar' };
export const msgErrUpdVoid: IStatusMessage = { statusCode: 400, statusMessage: 'Nada foi modificado' };
//DELETE
export const msgErrRem: IStatusMessage = { statusCode: 400, statusMessage: 'Erro ao tentar remover' };
export const msgErrRemVoid: IStatusMessage = { statusCode: 400, statusMessage: 'Nada foi removido' };
//OTHERS
export const msgErrUnexpected: IStatusMessage = { statusCode: 503, statusMessage: 'Erro não esperado no servidor' };
export const msgErrDenied: IStatusMessage = { statusCode: 403, statusMessage: 'Permissão negada' };
export const msgErrNoData: IStatusMessage = { statusCode: 204, statusMessage: 'Nenhum dado enviado' };
export const msgErrNoPermission: IStatusMessage = { statusCode: 403, statusMessage: 'Usuário não autorizado a realizar esta operação' };
export const msgSuccess: IStatusMessage = { statusCode: 200, statusMessage: 'Ação realizada com sucesso' }

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