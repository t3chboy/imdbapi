const authMiddleService = require('../helpers/authorize');
const movieController = require('../controllers/movieController');
const appConstants = require('../appconstants');

const movieControllerObj = new movieController();	



const routes = [
  {
    method: 'POST',
    url: '/movie/create/',
    preHandler : function( request , reply , done ){
    	done();
    }, 
    handler: function(request, reply){
    	try{
    	movieControllerObj.create( request ).then(data => {
            reply.send({'data':data});
        },err =>{ 
            reply.send(err);
            //logger.info(err);
        });
    }catch( error ){
        reply.send(error);
        //logger.info(error);
    }
    }	
},

{
	method: 'POST',
	url: '/signup',
	handler: function (request, reply) {

			const userInfoPayload = {
				name : request.body.name,
				role : appConstants.rolesId[request.body.roleId]
			}

			const userAccessToken = authMiddleService.createToken( userInfoPayload );
    		
    		reply.send(
	    		{ 
	    			message: 'Welcome to imdb, kindly use the provided ssoToken for further communication.',
	    			ssoToken : userAccessToken
	    		 }
    		);
  	}

},
	

{
	method: 'GET',
	url: '/',
	handler: function (request, reply) {
			
			const userInfoPayload = {
				name : "kaushil",
				role : "user"
			}
			const userAccessToken = authMiddleService.createToken( userInfoPayload );
    		
    		reply.send(
	    		{ 
	    			message: 'Welcome to imdb',
	    			ssoToken : userAccessToken
	    		 }
    		 );
  	}
}

]

module.exports = routes;