
export function toggle(validate) {
    return (validate) ? false : true;
};

export function percentual(qtd, done) {
    return parseFloat(((done * 100) / (qtd)).toFixed(1));
};

export function invalidField(field) {
    return (field !== undefined && field !== null && field !== "") ? true : false;
}

/**
 * @description Filtra uma lista retornando apenas os item equivalentes da pesquisa. Obs: Esta função ignora automaticamente os acentos.
 * @param {String} string Texto/string a ser pesquisado no array
 * @param {Array} objList Lista que será feito a busca
 * @param {Object} options Opções de busca (caseSesitive, global)
 * @returns Retorna uma lista dos itens encontrados
 */
export function filters(string, objList, options) {
    string = removeAccents(string)
    let i = options.caseSensitive ? 'i' : '';
    let g = options.global ? 'g' : '';

    let list = objList.filter((e) => new RegExp('\w*' + string, i + g).test(removeAccents(e)));
    return list;
}

/**
 * @description Remove acentuações das letras (A,a,E,e,I,i,O,o,U,u,N,n,C,c)
 * @param {String} source Texto a ser alterado
 * @returns Retorna o texto inserido sem letras acentuadas
 */
export function removeAccents(source) {
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g  // C, c
    ],
        noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    for (var i = 0; i < accent.length; i++) {
        source = source.replace(accent[i], noaccent[i]);
    }

    return source;
}

export const Util = {
    isValidCpf,
    isValidEmail
}

export function isValidCpf(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

export function isValidEmail(email) {
    //less unicode
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //with unicode
    // const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

// export function isValidEmail(email) {
//     var exclude = /[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/;
//     var check = /@[w-]+./;
//     var checkend = /.[a-zA-Z]{2,3}$/;
//     if (((email.search(exclude) != -1) || (email.search(check)) == -1) || (email.search(checkend) == -1)) { return false; }
//     else { return true; }
// }