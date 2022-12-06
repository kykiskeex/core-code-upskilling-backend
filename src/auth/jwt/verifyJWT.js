const jwt      = require('jsonwebtoken');
const secret =require("./secret.js");
var refreshTokens = {}

var verifyJWT =()=>{
return (req, res, next)=>{  
	var tokenArray={};
	var token='';
	var refreshToken=null;
	var username=res.req.headers.username || req.body.username;  
	
	/*trata de obtener el token del body de message y del header:x-access-token */
    tokenArray[1] = (res.req.headers && res.req.headers.access_token)|| (req.body && req.body.access_token) || req.headers['Authorization'] || res.req.headers['Authorization'];
	
		//valida si el token se encuentra en el header del authorization
		if(res.req.headers.authorization){			
					tokenArray=res.req.headers.authorization.split(' ');						
			}

	if(tokenArray[1]===undefined)	{
		return res.status(412).send({ auth: false, message: 'No token provided.' });
	}
	 
	token=tokenArray[1];
	if (!token) return res.status(412).send({ auth: false, message: 'No token provided.' });
  
  	jwt.verify(token, secret.keyToken, function(err, decoded) {
		
    if (err) {
		if(err.message==='jwt expired' || err.name==='TokenExpiredError'){						
			
			refreshToken=res.req.headers.refresh_token || req.body.refresh_token;

			if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] === username)) {
				
				//Verifica si el RefreshToken ya expiro
				jwt.verify(refreshToken, secret.keyRefreshToken, function(err, decoded) {
					if (err) {
						if(err.message==='jwt expired' || err.name==='TokenExpiredError'){
							return res.status(401).send({ auth: false, message: 'Refresh token Expired.', error: err });
						}else{
							return res.status(401).send({ auth: false, message: 'Failed to authenticate Refresh token.', error: err });
						}
					}
				});


				UserToken ={userName: username, type:'Token'};
				UserRefreshToken ={userName: username, type:'Refresh Token'};				
				var newToken = jwt.sign(UserToken, secret.keyToken, { expiresIn: secret.tokenExpired });
				var newRefreshToken = jwt.sign(UserRefreshToken, secret.keyRefreshToken, { expiresIn: secret.refreshTokenExpired });
				refreshTokens[newRefreshToken] = User.userName;								
				delete refreshTokens[refreshToken];						
				return res.status(201).send({ auth: false, message: 'New Token', token: newToken, refreshToken: newRefreshToken});
			  }
			  else {
				return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', error: err });
			  }
			
		}else{
			return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', error: err });
		}
		
	}
    next();
  });

}
}

module.exports.verifyJWT=verifyJWT;
module.exports.refreshTokens=refreshTokens;
