var tm = require("./test.js");


let testFuncList = {};



async function login() {

}

testFuncList.resetPassword = async function () {
	await tm.put("/api/user/settings/password", {password : "bgbg"} );
}




async function _getMyPageComments(offset, num) {
	await tm.get(`/api/mypage/comments/${offset}/${num}` );
}
testFuncList.getMyPageComments = async function () {
	return await _getMyPageComments(0, 10);
}


async function _getUserPageComments(username, offset, num) {
	await tm.get(`/api/users/${username}/comments/${offset}/${num}` );
}
testFuncList.getUserPageComments = async function () {
	return await _getUserPageComments("bg", 0, 10);
}



let funcName = process.argv[2];
testFuncList[funcName]();


