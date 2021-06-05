
export interface PostData {
    id : number;
    userAccountId : number;
    content : string;
    userDisplayName : string;
    parentId : number | null;
    numOfChildren : number;
    title : string;
    categoryIds : Array<number>;
    isArchived :boolean;
    likeType : string;
    children? : Array<PostData> | null;
}

export interface SimpleCallbackType { 
    () : void 
};
