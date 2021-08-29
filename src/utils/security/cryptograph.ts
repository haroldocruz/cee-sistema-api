import { AES, enc } from "crypto-js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

let instance = null;

class Cryptograph {

    constructor() {
        if (!instance)
            instance = this;
        return instance;
    }

    static encodeTextAES(text: string): string {
        return AES.encrypt(text, process.env.SALT_KEY).toString();
    }

    static decodeTextAES(cipherText: string): string {
        console.log(cipherText)
        return AES.decrypt(cipherText, process.env.SALT_KEY).toString(enc.Utf8);
    }

    /**
     * @description Cria um hash de uma string passada
     * @param password String a qual será codificada
     * @returns Retorna um hash (string codificada)
     */
    static async createHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    /**
     * @description Compara um dado com outro previamente codificado
     * @param reqPass String a ser comparada com a string previamente codificada
     * @param dataPass String previamente codificada
     * @returns Retorna um valor do tipo boolean (true|false)
     */
    static async compareHash(reqPass: string, dataPass: string): Promise<boolean> {
        return await bcrypt.compare(reqPass, dataPass);
    }

    /**
     * @description Codifica um token usando chave simétrica.
     * @param data Objeto com dados referentes ao usuário
     * @returns Retorna uma string codificada
     */
    static async generateToken(data: any): Promise<string> {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: data
        }, process.env.SALT_KEY);
    }

    /**
     * @description Decodifica o token convertendo para seu estado original
     * @param token {any} Recebe um token (informação codificada)
     * @returns Retorna uma promise do tipo 'qualquer tipo' ( pode ser uma string, objeto)
     */
    static async decodeToken(token: string): Promise<any> {
        return await jwt.verify(token, process.env.SALT_KEY);
    }

}

export default Cryptograph;