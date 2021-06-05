var tm = require("./test.js");


let testFuncList = {};




async function _testGetComments(nPostId, filter, offset, num) {		
	await tm.get(`curl --insecure --request GET https://127.0.0.1:4725/api/posts/${nPostId}/comments/${filter}/${offset}/${num}  -H "Content-Type: application/json" `);
}
async function _testGetCommentsWithGuest(nPostId, filter, offset, num) {		
	await tm.getWithGuest(`curl --insecure --request GET https://127.0.0.1:4725/api/posts/${nPostId}/comments/${filter}/${offset}/${num}  -H "Content-Type: application/json" `);
}
testFuncList.testGetComments = async function() {	
	await _testGetComments(80, "best", 0, 20);
};
testFuncList.testGetCommentsWithGuest = async function() {	
	await _testGetCommentsWithGuest(80, "best", 0, 20);
};





function _testWriteComment(nPostId,  strPoll, strComment)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request PUT https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
			+ ` -d '{ "poll" : "${strPoll}", "comment" : "${strComment}" }' ` ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
//testUpdatePostComment(101, 1188, "left", "변경했뜸");


























function testGetComment(nPostId, commentId)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request GET https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
//testGetComment(80, 1165);




function testUpdatePostComment(nPostId, commentId, strPoll, strComment)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request PUT https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
			+ ` -d '{ "poll" : "${strPoll}", "comment" : "${strComment}" }' ` ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testUpdatePostComment(101, 1188, "left", "변경했뜸");


function testDeletePostComment(nPostId, commentId)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request DELETE https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" ';
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testDeletePostComment(101, 1188);



function testGetCommentStats(nPostId, commentId)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request GET https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId  + '/stats' + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
//testGetCommentStats(80, 1165);



let funcName = process.argv[2];
testFuncList[funcName]();


