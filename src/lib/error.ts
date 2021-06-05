export * from "./AppAlert";
export class AppError {
    _code : number;
    _message : string;
    
    constructor(code : number, message : string) {
        this._code = code;
        this._message = message;
    }

    getMessage() {
        return this._message;
    }    
};