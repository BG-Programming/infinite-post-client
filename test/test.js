
var USER_EMAIL = "bg";
var USER_PASSWORD = "1234";



var async = require("async");
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;






async function loginWithUserSync() {
	return await loginSync(USER_EMAIL, USER_PASSWORD);
}



async function loginSync( email, password ) {
	return await new Promise((resolve, reject)=>{
		var cmd = 'curl --insecure --request POST https://bgprogramming.com/api/login -H "Content-Type: application/json" ' + 
				' -d \'{ "emailOrUsername" : "' + email + '", "password" : "' + password +'" }\' ';	

		console.log(cmd);
	
		exec(cmd, function(error, stdout, stderr){
			console.log(stdout);
			var jsonResult = JSON.parse(stdout);
			resolve(jsonResult.token);
		} );	

	});	
}



module.exports.put = async function(url, data) {
	const token = await loginWithUserSync();	
	const strJson = JSON.stringify(data);
	let cmd = `curl --insecure  --request PUT https://127.0.0.1:4725${url}  -H "Authorization: ${token}" -H "Content-Type: application/json" `
				+ ` -d '${strJson}' `;
	const result = execSync(cmd, {stdio: 'inherit'});
	console.log(result);
}


module.exports.get = async function(url) {
	const token = await loginWithUserSync();	
	let cmd = `curl --insecure  --request GET https://127.0.0.1:4725${url}  -H "Authorization: ${token}" -H "Content-Type: application/json" `;
	const result = execSync(cmd, {stdio: 'inherit'});
	console.log(result);
}

module.exports.getWithGuest = async function(url) {		
	let cmd = `curl --insecure  --request GET https://127.0.0.1:4725${url}  -H "Content-Type: application/json" `;
	const result = execSync(cmd, {stdio: 'inherit'});
	console.log(result);
}







































function loginWithUser( callback )
{
	login(USER_EMAIL, USER_PASSWORD, callback);
}


function login( email, password, callback )
{
	var cmd = 'curl --insecure --request POST https://127.0.0.1:4725/api/user/login -H "Content-Type: application/json" ' + 
				' -d \'{ "email" : "' + email + '", "password" : "' + password +'" }\' ';	
	
	exec(cmd, function(error, stdout, stderr){
		var jsonResult = JSON.parse(stdout);		
		return callback(jsonResult.token);
	} );	
}


function testCheckToken()
{
	loginWithUser( function (token) {
		let cmd = `curl --insecure  --request POST https://127.0.0.1:4725/api/user/check-token  -H "Authorization: ${token}" -H "Content-Type: application/json" `
					+ ` -d '{ "token" : "${token}"}' `;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testCheckToken();



function testBlockChainInfo()
{
	let cmd = 'curl --request GET https://127.0.0.1:4725/api/blockchain/info -H "Content-Type: application/json" ';
	exec(cmd, function(error, stdout, stderr){
		console.log( stdout );
	} );	
	
}


function testBlockChanProperty(address)
{	
	var cmd = 'curl --request GET https://127.0.0.1:4725/api/blockchain/' + address +  '/property '   +   ' -H "Content-Type: application/json" ';
	exec(cmd, function(error, stdout, stderr){
		console.log( stdout );
	} );	
	
}
// testBlockChanProperty("0x97e0219064a1530f2b5dfbf60ff2210a4149f8bc");


function testSignupRequest(email)
{	
	console.log("testSignupRequest");
	var cmd = 'curl --insecure --request  POST https://127.0.0.1:4725/api/signup/email/request -H "Content-Type: application/json" ' +
				' -d \'{ "email" : "' + email + '" }\' ';	;
	console.log(cmd);
	exec(cmd, function(error, stdout, stderr){
		console.log( stdout );
	} );	
	
}
//testSignupRequest("embc32@naver.com");


function testCheckAuthNumber(email, authNum)
{	
	var cmd = `curl --insecure --request  GET https://127.0.0.1:4725/api/signup/check/${email}/auth-num/${authNum} -H "Content-Type: application/json" `	
	exec(cmd, function(error, stdout, stderr){
		console.log( stdout );
	} );		
}
//testCheckAuthNumber("embc32@naver.com", "467779");


function testSignup( strEmail, strPassword, strUserName )
{	
	
	var cmd = 'curl --insecure --request POST https://127.0.0.1:4725/api/signup/signup '  + ' -H "Content-Type: application/json" '
				+ `-d '{ "email" : "${strEmail}", "password" : "${strPassword}", "userName" : "${strUserName}", "firstName" : "bg", "gender" : "M", "birthYear" : 1979, "birthMonth" : 7, "birthDay" : 29, "language" : "ko", "country" : "KR"   }' ` ;

	console.log(cmd);
	exec(cmd, function(error, stdout, stderr){
		console.log( stdout );
	} );	
	
}
// testSignup( "bg@test.net", "1234", "bgbg" );






function testGetPost(postId)
{	
	let cmd = 'curl --insecure  --request GET https://127.0.0.1:4725/api/posts/' + postId + '   -H "Content-Type: application/json" ';
	exec(cmd, function(error, stdout, stderr){
		console.log( stdout );
	} );	
	
}
// testGetPost(86);


function testCreatePost(strYoutubeId, strQuestion)
{	
	loginWithUser( function (token) {
		let cmd = `curl --insecure  --request POST https://127.0.0.1:4725/api/post/new  -H "Authorization: ${token}" -H "Content-Type: application/json" `
					+ ` -d '{ "youtubeId" : "${strYoutubeId}", "question" : "${strQuestion}", "isCustomPoll" : false }' ` ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
	
}
// testCreatePost("KdOA5BCwBi0", "빠빠빠");

function testPostDetail(nPostId)
{	
	loginWithUser( function (token) {
		let cmd = `curl --insecure  --request GET https://127.0.0.1:4725/api/posts/${nPostId}  -H "Authorization: ${token}" -H "Content-Type: application/json" `;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
	
}
// testPostDetail(140);
//testPostDetail(59);


function testPostDetailStats(nPostId)
{	
	loginWithUser( function (token) {
		let cmd = `curl --insecure  --request GET https://127.0.0.1:4725/api/posts/${nPostId}/stats  -H "Authorization: ${token}" -H "Content-Type: application/json" `;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
	
}
//testPostDetailStats(140);


function testUpdatePost(nPostId, strQuestion)
{	
	loginWithUser( function (token) {
		let cmd = `curl --insecure  --request PUT https://127.0.0.1:4725/api/posts/${nPostId}  -H "Authorization: ${token}" -H "Content-Type: application/json" `
					+ ` -d '{ "question" : "${strQuestion}" }' ` ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});
	
}
//testUpdatePost(140, "한번더 나에게 질풍같은 용기를!!");



function testArchivePost(nPostId, strQuestion)
{	
	loginWithUser( function (token) {
		let cmd = `curl --insecure  --request DELETE https://127.0.0.1:4725/api/posts/${nPostId}  -H "Authorization: ${token}" -H "Content-Type: application/json" `;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
	
}
// testArchivePost(140);







function testPostVote(nPostId, chVote )
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request POST https://127.0.0.1:4725/api/posts/' + nPostId + '/vote '  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
					+ ' -d \'{ "vote" : "' + chVote + '" }\' ' ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testPostVote(11, 'U');


function testCommentVote(nPostId, commentId, chVote )
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request POST https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId + '/vote '  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
					+ ' -d \'{ "vote" : "' + chVote + '" }\' ' ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testCommentVote(38, 988, 'U');


function testWriteCommentReply(nPostId, commentId, strComment) {
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request POST https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId + '/reply '  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
					+ ' -d \'{ "comment" : "' + strComment + '" }\' ' ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testWriteCommentReply(137, 1313, "훗");

function testWriteCommentReplyReply(nPostId, commentId, nReplyId, strComment) {
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request POST https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId + '/replies/' +  nReplyId  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
					+ ' -d \'{ "comment" : "' + strComment + '" }\' ' ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testWriteCommentReplyReply(137, 1313, 641, "훗훗");


function testUpdateReply(nPostId, commentId, nReplyId, strComment) {
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request PUT https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId + '/replies/' +  nReplyId  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
					+ ' -d \'{ "comment" : "' + strComment + '" }\' ' ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testUpdateReply(137, 1313, 641, "우후후훗");


function testUpdateReply(nPostId, commentId, nReplyId, strComment) {
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request PUT https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId + '/replies/' +  nReplyId  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
					+ ' -d \'{ "comment" : "' + strComment + '" }\' ' ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testUpdateReply(137, 1313, 641, "우후후훗");


function testDeleteReply(nPostId, commentId, nReplyId) {
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request DELETE https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId + '/replies/' +  nReplyId  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" ';
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testDeleteReply(137, 1313, 641);


function testCommentReplyVote(nPostId, commentId, replyId, chVote )
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request POST https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId + '/replies/' + replyId + '/vote '  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
					+ ' -d \'{ "vote" : "' + chVote + '" }\' ' ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testCommentReplyVote(37, 986, 97, 'U');





function testReplyList(nPostId, commentId)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request GET https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId  + '/replies' + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testReplyList(80, 1167);




function testReplyTree(nPostId, commentId, replyId)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request GET https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId  + '/replies/' + replyId + '/tree'  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
//testReplyTree(80, 1167, 458);



function testReplyStats(nPostId, commentId, replyId)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request GET https://127.0.0.1:4725/api/posts/' + nPostId + '/comments/' + commentId  + '/replies/' + replyId + '/stats'  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testReplyStats(80, 1167, 458);



function testGetPollCount(nPostId)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request GET https://127.0.0.1:4725/api/posts/' + nPostId+ '/poll '  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testGetPollCount(101);


function testDecidePoll(nPostId, strPoll)
{	
	loginWithUser( function (token) {
		var cmd = `curl --insecure  --request POST https://127.0.0.1:4725/api/posts/${nPostId}/poll  -H "Authorization: ${token}" -H "Content-Type: application/json" `
			+ `-d '{ "poll" : "${strPoll}"  }' ` ;

		console.log(cmd);
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testDecidePoll(137, "left");



function testResetPasswordWithMail(nId, strEmail, strConfirmNumber, strPassword)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request POST https://127.0.0.1:4725/api/user/password/email/reset'  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
					+ `-d '{ "id" : ${nId}, "email" : "${strEmail}", "verifyNumber" : "${strConfirmNumber}", "password" : "${strPassword}"   }' ` ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
//testResetPasswordWithMail(74, "embc32@naver.com", "484554", "1111");



function testSendPasswordResetMail(strEmail)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request POST https://127.0.0.1:4725/api/user/password/email'  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
					+ `-d '{ "email" : "${strEmail}"   }' ` ;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testSendPasswordResetMail("embc32@naver.com");




function testGetUserNotifications(keyId)
{	
	loginWithUser( function (token) {
		var cmd = `curl --insecure --request GET https://127.0.0.1:4725/api/user/notifications/${keyId}`  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" ';					
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
function testGetUserNotificationsNoLogin(keyId)
{
	var cmd = `curl --insecure --request GET https://127.0.0.1:4725/api/user/notifications/${keyId} `  + ' -H "Content-Type: application/json" ';
	console.log(cmd);
	exec(cmd, function(error, stdout, stderr){
		console.log( stdout );
	} );	
	
}
//testGetUserNotifications(-1);
// testGetUserNotificationsNoLogin(-1);



function testUpdateMyPageProfileInfo(strGender, strLanguageCode, strCountryCode, nBirthYear, nBirthMonth, nBirthDay)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request PUT https://127.0.0.1:4725/api/mypage/profile '  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
					+ `-d '{ "gender" : "${strGender}", "languageCode" : "${strLanguageCode}", "countryCode" : "${strCountryCode}", "birthYear" : ${nBirthYear}, "birthMonth" : ${nBirthMonth}, "birthDay" : ${nBirthDay}    }' ` ;

		console.log(cmd);
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
//testUpdateMyPageProfileInfo("M", "ko", "KR", 1979, 1, 1 );



function testGetMyPageProfileInfo(strGender, strLanguageCode, strCountryCode, nBirthYear, nBirthMonth, nBirthDay)
{	
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request GET https://127.0.0.1:4725/api/mypage/profile '  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '					
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testGetMyPageProfileInfo();


function testDeleteProfileImage()
{
	loginWithUser( function (token) {
		var cmd = 'curl --insecure --request DELETE https://127.0.0.1:4725/api/mypage/profile/image '  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
//testDeleteProfileImage();

function testGetMyPagePosts(nOffset, nNum)
{	
	loginWithUser( function (token) {
		var cmd = `curl --insecure --request GET https://127.0.0.1:4725/api/mypage/posts/${nOffset}/${nNum} `  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
//testGetMyPagePosts(0, 10);


function testGetMyPageComments(nOffset, nNum)
{	
	loginWithUser( function (token) {
		var cmd = `curl --insecure --request GET https://127.0.0.1:4725/api/mypage/comments/${nOffset}/${nNum} `  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testGetMyPageComments(70, 10);




function testReport(strReportType, nReportId, strCategory, strDetail ) {
	loginWithUser( function (token) {
		var cmd = `curl --insecure --request POST https://127.0.0.1:4725/api/report `  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
					+ ` -d '{ "reportType" : "${strReportType}", "targetId" : ${nReportId},  "category" : "${strCategory}"  }' `;
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testReport("reply", 20, "pronography" );













function testGetUserPageInfo(strUsername)
{	
	loginWithUser( function (token) {
		var cmd = `curl --insecure --request GET https://127.0.0.1:4725/api/users/${strUsername} `  + ' -H "Authorization:' + token + '" -H "Content-Type: application/json" '
		exec(cmd, function(error, stdout, stderr){
			console.log( stdout );
		} );	
	});	
}
// testGetMyPageInfo("bg");


function testGetUserPagePosts(strUsername, nOffset, nNum)
{		
	var cmd = `curl --insecure --request GET https://127.0.0.1:4725/api/users/${strUsername}/posts/${nOffset}/${nNum}  -H "Content-Type: application/json" `
	exec(cmd, function(error, stdout, stderr){
		console.log( stdout );
	} );	
	
}
// testGetUserPagePosts("bg", 0, 10);



function testGetUserPageComments(strUserName, nOffset, nNum)
{		
	var cmd = `curl --insecure --request GET https://127.0.0.1:4725/api/users/${strUserName}/comments/${nOffset}/${nNum}   -H "Content-Type: application/json"  `;
	exec(cmd, function(error, stdout, stderr){
		console.log( stdout );
	} );		
}
//testGetUserPageComments('bg', 20, 10);



function testCheckUserName(strUserName)
{		
	var cmd = `curl --insecure --request POST https://127.0.0.1:4725/api/signup/check-username -H "Content-Type: application/json" `
				+ ` -d '{ "userName" : "${strUserName}" }' ` ;
	exec(cmd, function(error, stdout, stderr){
		console.log( stdout );
	} );		
}
// testCheckUserName("bg");



async function testLogin() {
	const token = await loginWithUserSync();
	console.log(token);
}

testLogin();


