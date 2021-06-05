import {AppError} from "lib/error";


const SERVER_HOST = "https://bgprogramming.com";
const METHOD = {
    GET : "get",
    POST : "post",
    PUT : "put",
    DELETE : "delete",
};

class API {
    _token : string | null = null;

    async _request(method : string, url : string, bodyParams? : object) {
        const jsonAuthrization = this._token ? {Authorization : this._token  } : undefined;

        const fetchResult = await fetch(
            SERVER_HOST + url, 
            {            
                method, 
                body : bodyParams ? JSON.stringify(bodyParams) : null,
                headers: {
                    'Content-Type': 'application/json',
                    ...jsonAuthrization
                }
            }
        );

        // console.info("fetchResult>>>", fetchResult);
        if (fetchResult.status === 200) {
            return await fetchResult.json();
        } else if (fetchResult.status === 404) {            
            throw new AppError(1, "API NOT FOUND");            
        }else {
            const jsonError = await fetchResult.json();
            throw new AppError(jsonError.code, jsonError.msg);
        }       
    }

    setToken(token : string) {
        this._token = token;
    }
    

    async getPostList() {
        const result = await this._request(
            METHOD.GET,
            "/api/posts/100/0"
        );    
        return result;
    }

    async writePost(title : string, description : string, parentId? : number | null) {
        const result = await this._request(
            METHOD.POST,
            "/api/post", 
            {
                title, 
                content : description,
                parentId
            }
        );        
        return result;
    }





    async getPostDetail(postId : number) {
        const result = await this._request(
            METHOD.GET,
            `/api/posts/${postId}`
        );    
        return result;
    }

    async login(emailOrUsername : string, password : string) {
        const result = await this._request(
            METHOD.POST,
            `/api/login`,
            {emailOrUsername, password}
        );    
        return result;
    }

}

const _instance = new API();
export const api = _instance;