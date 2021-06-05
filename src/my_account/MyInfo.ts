interface MyInfoData {
    id : number,
    userName : string,
    email : string
}

class MyInfo {
    _id : number = -1;
    _userName : string = "";
    _email : string = "";
    _isLogin : boolean = false;

    init(info : MyInfoData) {
        this._id = info.id;
        this._userName = info.userName;
        this._email = info.email;
        this._isLogin = true;
    }

    isLogin() : boolean {
        return this._isLogin;
    }

}

const _myInfo = new MyInfo();
export const myInfo = _myInfo;