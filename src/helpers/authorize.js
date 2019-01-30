
let jwt = require('jsonwebtoken');
const config = require('../configuration.js');
const appConstants = require('../appconstants.js');

const authorize = async function verify( request ){
	
	userssoToken = request.headers.authorization;

	verificationResult = jwt.verify(userssoToken, config.secret);
	
	isRoleAuthorized = ( verificationResult.userInfoPayload.role === appConstants.rolesId[request.headers.roleid] ) ? 1 : 0;
	
	return isRoleAuthorized;
}

const createToken = function generateToken( userInfoPayload ){

	const token = jwt.sign( { userInfoPayload },
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
	);

	return token;
} 

module.exports = { authorize,createToken};	