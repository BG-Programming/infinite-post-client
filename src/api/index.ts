import AppError from "lib/error";


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
        const fetchResult = await fetch(
            SERVER_HOST + url, 
            {            
                method, 
                body : bodyParams ? JSON.stringify(bodyParams) : null,
                headers: {
                    'Content-Type': 'application/json'                    
                }
            }
        ).then(async (res) => {
            console.log(res);
            if (process.env.NODE_ENV !== 'production') {
                // console.log(`👇received status >>>`);
                // console.info(res);
            }

            if (res.status === 200) {
                return await res.json();
            } else {
                const jsonError = await res.json();
                throw new AppError(jsonError.code, jsonError.msg);
            }
        })
        .catch(err => {            
            throw err;
        });

        return fetchResult;
    }

    setToken(token : string) {
        this._token = token;
    }
    




    async getPostList() {

        const result = await this._request(
            METHOD.GET,
            "/api/posts/100/0"
        );    
        console.log(result);
        return result;
    }



    async getPostDetail(postId : number) {
        const result = await this._request(
            METHOD.GET,
            `/api/posts/${postId}`
        );    
        console.info("result>>>>>>>>", result);
        return result;
    }

    async login(emailOrUsername : string, password : string) {
        const result = await this._request(
            METHOD.POST,
            `/api/login`,
            {emailOrUsername, password}
        );    
        console.info("result>>>>>>>>", result);
        return result;
    }

}

const _instance = new API();
export const api = _instance;