'use strict'

export interface IMessage {
    statusCode: number;
    statusMessage: string;
}

// module.exports = {
export const messages = {
    //CONNECTION
    'errConn': { statusCode: 502, statusMessage: 'Erro ao tentar conectar'},
    //LOGIN
    'errUserAbsent': { statusCode: 406, statusMessage: 'Usuário não cadastrado'},
    'errPass': { statusCode: 406, statusMessage: 'Senha inválida'},
    'errLogin': { statusCode: 400, statusMessage: 'Erro ao tentar fazer login'},
    'errLowLevel': { statusCode: 403, statusMessage: "Necessário elevar seu nível de acesso para realizar esta ação"},
    'errNoAuth': { statusCode: 401, statusMessage: "Somente usuários autenticados podem realizar esta ação"},
    //CONNECT
    'errToken': { statusCode: 400, statusMessage: 'Token inválido'},
    'errNoToken': { statusCode: 401, statusMessage: 'Acesso restrito'},
    //CREATE
    'errMailExist': { statusCode: 400, statusMessage: 'Email já cadastrado'},
    'errSave': { statusCode: 400, statusMessage: 'Erro ao tentar salvar'},
    //READ
    'errFind': { statusCode: 204, statusMessage: 'Nenhum dado encontrado'},
    //UPDATE
    'errUpd': { statusCode: 400, statusMessage: 'Erro ao tentar atualizar'},
    //DELETE
    'errRem': { statusCode: 400, statusMessage: 'Erro ao tentar remover'},
    //OTHERS
    'errNoData': { statusCode: 204, statusMessage: 'Nenhum dado enviado'},
    'success': { statusCode: 200, statusMessage: 'Ação realizada com sucesso'}
};

// 100	Continue	Continuar
// 101	Switching Protocols	Mudando Protocolos
// 102	Processing	Processando
// 200	Ok	Ok
// 201	Created	Criado
// 202	Accepted	Aceito
// 203	Non-Authoritative Information	Não autorizado
// 204	No Content	Nenhum Conteúdo
// 205	Reset Content	Resetar Conteúdo
// 206	Partial Content	Conteúdo Parcial
// 300	Multiple Choices	Múltipla Escolha
// 301	Moved Permanently	Movido Permanentemente
// 302	Found	Encontrado
// 303	See Other	Veja outro
// 304	Not Modified	Não modificado
// 305	Use Proxy	Use Proxy
// 306	Proxy Switch	Proxy Trocado
// 400	Bad Request	Solicitação Inválida
// 401	Unauthorized	Não autorizado
// 402	Payment Required	Pagamento necessário
// 403	Forbidden	Proibido
// 404	Not Found	Não encontrado
// 405	Method Not Allowed	Método não permitido
// 406	Not Acceptable	Não aceito
// 407	Proxy Authentication Required	Autenticação de Proxy Necessária
// 408	Request Time-out	Tempo de solicitação esgotado
// 409	Conflict	Conflito
// 410	Gone	Perdido
// 411	Length Required	Duração necessária
// 412	Precondition Failed	Falha de pré-condição
// 413	Request Entity Too Large	Solicitação da entidade muito extensa
// 414	Request-URL Too Large	Solicitação de URL muito Longa
// 415	Unsupported Media Type	Tipo de mídia não suportado
// 416	Request Range Not Satisfiable	Solicitação de faixa não satisfatória
// 417	Expectation Failed	Falha na expectativa
// 500	Internal Server Error	Erro do Servidor Interno
// 501	Not Implemented	Não implementado
// 502	Bad Gateway	Porta de entrada ruim
// 503	Service Unavailable	Serviço Indisponível
// 504	Gateway Time-out	Tempo limite da Porta de Entrada
// 505	HTTP Version Not Supported	Versão HTTP não suportada