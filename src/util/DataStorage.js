import CryptoJS from "crypto-js";

const SPECIAL_PACKAGE_NAME_CRYPTO = "Crypto";

const _memory = new Map();
const SECRET_KEY = "dataSecretKey!";

function _getKey(packName, key) {
    return packName + "_" + key;
}

// default is using local storage
class DataStorage {
    memory = {
        set : (packName, key, value) => {
            const pageKey = _getKey(packName,key);
            _memory.set(pageKey, value);
        },
        get : (packName, key, defaultValue) => {
            const pageKey = _getKey(packName, key);
            return _memory.get(pageKey) || defaultValue;
        },
        delete : (packName, key)=>{
            const pageKey = _getKey(packName, key);
            _memory.delete(pageKey);
        }
    };

    session = {
        set : (packName, key, value) =>{
            const pageKey = _getKey(packName,key);
            let storeValue = JSON.stringify( { type : typeof value, data : value } );
            sessionStorage.setItem(pageKey, storeValue);
        },
        get : (packName, key, defaultValue) => {
            const pageKey = _getKey(packName,key);
            const itemValue = sessionStorage.getItem(pageKey);
            if( !itemValue )
                return defaultValue;
            const valueObject = JSON.parse( itemValue);
            return valueObject.data;
        },
        delete : (packName, key)=>{
            sessionStorage.removeItem( _getKey(packName,key));
        }
    };


    set(packName, key, value) {
        const pageKey = _getKey(packName,key);

        let storeValue;
        if( SPECIAL_PACKAGE_NAME_CRYPTO === packName )
            storeValue = JSON.stringify( { type : "crypto", data : CryptoJS.AES.encrypt(value, SECRET_KEY).toString() } );
        else
            storeValue = JSON.stringify( { type : typeof value, data : value } );

        localStorage.setItem(pageKey, storeValue);
    }

    get(packName, key, defaultValue) {
        const pageKey = _getKey(packName,key);

        const itemValue = localStorage.getItem(pageKey);
        if( !itemValue )
            return defaultValue ? defaultValue : null;

        const valueObject = JSON.parse( itemValue);
        const data = valueObject.data;
        if( SPECIAL_PACKAGE_NAME_CRYPTO === packName ) {
            var bytes  = CryptoJS.AES.decrypt(data, SECRET_KEY);
            return bytes.toString(CryptoJS.enc.Utf8);
        }
        else
            return data;

    }

    delete(packName, key) {
        localStorage.removeItem( _getKey(packName,key));
    }
}

const _instance = new DataStorage();
export const dataStorage = _instance;
export const SpecialPackageName = {
    crypto : SPECIAL_PACKAGE_NAME_CRYPTO
};
