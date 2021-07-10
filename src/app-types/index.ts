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
    createDate : number;
    parentInfo : PostData | null;
}

export interface LinkPostData {
    linkId : number;
    linkCreateDate : number;
    targetPostContent : string;
    targetPostId : number;
    targetPostTitle : string;
}

export interface SimpleCallbackType {
    () : void
};
