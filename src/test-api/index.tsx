class TestAPI {
    async getPostList () { return {
        list :  [
            {
                id : 2,
                userAccountId : 1,
                userDisplayName : "Tony",
                parentId : null,
                numOfChildren : 5,
                title : "second post",
                content : "good job~!",
                categoryIds : [],
                isArchived :false,
                createDate : 0,
                updateDate : null,
                likeType : "dislike"
            },
            {
                id :13,
                userAccountId : 2,
                userDisplayName : "BG",
                parentId : 2,
                numOfChildren : 3,
                title : "공포의 밤",
                content : "야심한 밤에\n동영상을 보는데\n\r엄마가 뒤에계셔!!!",
                categoryIds : [],
                isArchived :false,
                createDate : 0,
                updateDate : null,
                likeType : "dislike"
            },
            {
                id :14,
                userAccountId : 1,
                userDisplayName : "Tony",
                parentId : 4,
                numOfChildren : 0,
                title : "일해라~~~",
                content : "노세 노세 젊어서노세!",
                categoryIds : [],
                isArchived :false,
                createDate : 0,
                updateDate : null,
                likeType : "dislike"
            },
        ]
    }}


    async getPostDetail () { return {
        data : {
            id : 2,
            userAccountId : 1,
            userDisplayName : "Tony",
            parentId : null,
            numOfChildren : 5,
            title : "second post",
            content : "good job~!",
            categoryIds : [],
            isArchived :false,
            createDate : 0,
            updateDate : null,
            likeType : "dislike"
        }
    }}    
}

const _instance = new TestAPI();
export const api = _instance;