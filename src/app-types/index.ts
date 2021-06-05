
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
}

export interface SimpleCallbackType { 
    () : void 
};
