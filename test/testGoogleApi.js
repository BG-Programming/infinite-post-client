

// refresh_token: '1/CAD7OO5MOmlHLXx3BqAsABa6Gr4GFnq5ZBdegQV3kCw'

const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  "280114421792-5eih7cd6emq41s6vnnrhk95aplk09o8r.apps.googleusercontent.com",
  "2LgXyUfBGJ53Q7_-3SHCvUZj",
  "https://coffee.mogao.io:4725/auth/google/callback"
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
const scopes = [
  'profile',
  'email',
  'openid',  
];


// generate url
function getGooglePlusApi(auth) {
  return google.plus({ version: 'v1', auth });
}

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  // access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,

  state : "1x2asd2"

});
console.log(url);


/*

oauth2Client.setCredentials( {refresh_token : "1/CAD7OO5MOmlHLXx3BqAsABa6Gr4GFnq5ZBdegQV3kCw" });
oauth2Client.refreshAccessToken(function(err, tokens) {
  console.log(tokens);
});
*/


// async function main() {
// 	try {				



		
// 		oauth2Client.setCredentials( {refresh_token : "1/CAD7OO5MOmlHLXx3BqAsABa6Gr4GFnq5ZBdegQV3kCw" });

		
// 		const plus = getGooglePlusApi(oauth2Client);		
// 		const me = await plus.people.get({ userId: 'me' });


// 		// get the google id and email
//   		const userGoogleId = me.id;  		
//   		const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

  		
//   		console.log(me.data)
//   		console.log(userGoogleId)
//   		console.log(userGoogleEmail)
// 	}catch(err) {
// 		console.log(err);
// 	}
	
// }

// main();	



/*

// idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY2ZjgwZjM3ZjIxYzIzZTYxZjJiZTQyMzFlMjdkMjY5ZDY2OTUzMjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyODAxMTQ0MjE3OTItNWVpaDdjZDZlbXE0MXM2dm5ucmhrOTVhcGxrMDlvOHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyODAxMTQ0MjE3OTItNWVpaDdjZDZlbXE0MXM2dm5ucmhrOTVhcGxrMDlvOHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDU2Njg2Mzk4OTI1NTQxODEyMjAiLCJoZCI6Im1vZ2FvLmlvIiwiZW1haWwiOiJhZG1pbkBtb2dhby5pbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUHBpV0cyZ0pNX3VSc1BlVGJnNURaUSIsIm5hbWUiOiJTdGVwaGVuIFBhcmsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1seWVQcFhiTmhlWS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JlM1BsZF92Smw4bWRLYWlvc3llU3MzMVRieFV3L3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJTdGVwaGVuIiwiZmFtaWx5X25hbWUiOiJQYXJrIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1NjY4MTE0ODMsImV4cCI6MTU2NjgxNTA4M30.Cs2R0G6a_wnYrxeuVXVoq5Qr-vt3YNCtM239R78sUdRtuBs7qdz9GuhI8n_xHbVO93xTv7M808yljNB7HkqrKm1S6zOgqRVA_nR-1q-e9VQ-itkAIHs6xB-Jp3g62vRs60DC-e4KjOS-DDQtkof7msfjIeI0tE661CyjeIgloKqJe6aUJ-VyjmOaSgzKE_Bv8SoJPWMw5D-xV0J4M5ppy6Y0nN6RfaJkontAXNQQARV7Er4p5NU12ya8-jpzVVAOd1_P4FJ4dUCDp2TP86WMRgFBqDzSgRsgxYDC2zKsy7apS5oNtUg7Vx10wp00f3hDPiKTRhd-8uv_x04Tq4knVQ',

const CLIENT_ID = "280114421792-5eih7cd6emq41s6vnnrhk95aplk09o8r.apps.googleusercontent.com";

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY2ZjgwZjM3ZjIxYzIzZTYxZjJiZTQyMzFlMjdkMjY5ZDY2OTUzMjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyODAxMTQ0MjE3OTItNWVpaDdjZDZlbXE0MXM2dm5ucmhrOTVhcGxrMDlvOHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyODAxMTQ0MjE3OTItNWVpaDdjZDZlbXE0MXM2dm5ucmhrOTVhcGxrMDlvOHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDU2Njg2Mzk4OTI1NTQxODEyMjAiLCJoZCI6Im1vZ2FvLmlvIiwiZW1haWwiOiJhZG1pbkBtb2dhby5pbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiYnlXRmJ5eFFEbmhGS1FXcDZnUDd5ZyIsIm5hbWUiOiJTdGVwaGVuIFBhcmsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1seWVQcFhiTmhlWS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JlM1BsZF92Smw4bWRLYWlvc3llU3MzMVRieFV3L3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJTdGVwaGVuIiwiZmFtaWx5X25hbWUiOiJQYXJrIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1NjY3ODkwMTAsImV4cCI6MTU2Njc5MjYxMH0.M7opwBcnPtkbBecey4Z7SyGyqzcZclnSgh2ctuwT8WS_cUdAkRz86rljpA4zx1q4csJ7AP2fJtKiHCUhxQX14iAqhTqw5Vj3jLmkLNdyfaWLris0H02om9_f1JSasw25TNXK-BfBXlE9W9UNOLRPlf99PFwEPSkcJA0p65K_FrVVzcwyr0fJZ-LNiSAHSfzYSGlbKq5vmgzAKDGvoRPhavhlAZybE6Wq8rH8yFEfXtfHzITqTd0SiEviDVxiEDOVfor8eCjRsj2Q3fz4knQ3dIvD3gJRaesHg6OBzkhFsLuYoGskNv_QG5Did8xeh5nDU6MWNGXcibRp4YKpVTLy7g',
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });


  const payload = ticket.getPayload();  
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];

  console.log(payload);
  console.log(userid);
}

( async ()=> {
try {
	await verify();
}catch(e) {
	console.log(e);
}
})();


*/