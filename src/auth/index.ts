import {myInfo} from "my_account/MyInfo";
import {dataStorage, SpecialPackageName} from "util/DataStorage";
import {define} from "lib/stdlib";
import {api} from "api";

class Auth {
    _isInit = false;

    async init() {
        const userName : string = dataStorage.get( 
            define.DataStoragePackageName.USER_AUTH,
            define.DataStorageKeyNameUserAuth.USER_NAME
        );

        const password : string = dataStorage.get( 
            SpecialPackageName.crypto,
            define.DataStorageKeyNameUserAuth.PASSWORD
        );

        console.info("userName ", userName );
        console.info("password ", password );
        if(userName && password) {
            try {
                await this.login(userName, password);
            } catch(e) {                
                dataStorage.delete(define.DataStoragePackageName.USER_AUTH, define.DataStorageKeyNameUserAuth.USER_NAME);
                dataStorage.delete(SpecialPackageName.crypto, define.DataStorageKeyNameUserAuth.PASSWORD);
            }
            console.log("login completed");
        }
        this._isInit = true;
    }

    isInit() {
        return this._isInit;
    }

    async signup(email : string, userName : string, password : string) {        
        await api.signup(email, userName, password);
        this.login(userName, password);
    }

    async login(emailOrUserName : string, password : string) {        
        const response = await api.login(emailOrUserName, password);
        const packageName = define.DataStoragePackageName.USER_AUTH;
        const dataKey = define.DataStorageKeyNameUserAuth;
        api.setToken(response.token);

        console.info("response.userInfo>>", response.userInfo);

        dataStorage.set(SpecialPackageName.crypto, dataKey.PASSWORD, password);
        dataStorage.set(packageName, dataKey.TOKEN, response.token);
        dataStorage.set(packageName, dataKey.EMAIL, response.userInfo.email);
        dataStorage.set(packageName, dataKey.USER_NAME, response.userInfo.user_name);

        response.userInfo.userName = response.userInfo.username;
        myInfo.init(response.userInfo);        
    }
}

const _instance = new Auth();
export const auth = _instance;