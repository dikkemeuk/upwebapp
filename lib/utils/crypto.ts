import CryptoJS from 'crypto-js';

export function decrypt(string: string) {
    var bytes  = CryptoJS.AES.decrypt(string, 'secret key 123');
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedData 
}

export function encrypt(string: string) {
    var ciphertext = CryptoJS.AES.encrypt(string, 'secret key 123').toString()
    return ciphertext
}