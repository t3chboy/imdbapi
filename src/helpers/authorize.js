
let jwt = require('jsonwebtoken');
const config = require('../configuration.js');

console.log( config );

const authorize = function authorize(){
	
	jwt.verify(token, config.secret);

}

const createToken = function generateToken( username ){

	const token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
	);

	return token;
} 

module.exports = { authorize,createToken};	