import { environment } from "src/environments/environment";
import * as CryptoJS from 'crypto-js';

/**
 * References:
 * https://gist.github.com/ufologist/5581486
 * https://cryptojs.gitbook.io/docs/
 * https://www.webdevtutor.net/blog/could-not-find-file-module-crypto-js
 */

export const HasherHelper = {

    aesEncode(plain? : any): string {
        if(plain == null) return "";
        return CryptoJS.AES.encrypt(plain, environment.encryptionKey).toString();
    },

    aesDecode(encrypted? : any): string {
        if(encrypted == null) return "";
        return CryptoJS.AES.decrypt(encrypted, environment.encryptionKey).toString(CryptoJS.enc.Utf8);
    },
}