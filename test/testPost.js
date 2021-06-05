var tm = require("./test.js");


let testFuncList = {};




async function _testGetPostListWithGuest(filter, offset, num) {
	await tm.getWithGuest(`/api/posts/${filter}/${offset}/${num}`);
}
testFuncList.testGetPostListWithGuest = async function () {
	await _testGetPostListWithGuest("latest", 0, 10);
}


async function _testGetPostList(filter, offset, num) {		
	await tm.get(`/api/posts/${filter}/${offset}/${num}`);	
}
testFuncList.testGetPostList = async function () {
	await _testGetPostList("latest", 0, 10);
}







let funcName = process.argv[2];
testFuncList[funcName]();


