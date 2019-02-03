const authMiddleService = require('../helpers/authorize');
const movieController = require('../controllers/movieController');
const appConstants = require('../appconstants');

const searchController = require('../controllers/searchController');

const searchControllerObj = new searchController();

const movieControllerObj = new movieController();	

function routeAuthorization( request, reply, done ){
	
	authMiddleService.authorize( request ).then(data => {
		const isauthValid =  data;
		if( isauthValid ){
			done();
		 }else{
			reply
			.code(401)
			.send({ "Unauthorize-access": 'Unauthorize-access' });
		}
	},err => {
		reply
		.code(500)
		.send({ "Error": err });
	});
}	

const routes = [
  {
	method: 'POST',
	url: '/movie/',
	beforeHandler : function( request, reply, done ) {
		routeAuthorization( request, reply, done  );
	},
	handler: function(request, reply){
		try{
		movieControllerObj.create( request.body ).then(data => {
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
	method : 'DELETE',
	url: '/movie/:id',
	beforeHandler : function( request, reply, done ) {
		routeAuthorization( request, reply,done  );
	},
	handler: function(request, reply){
		try{
		movieControllerObj.delete( request.params ).then(data => {
			reply.send({'data':data});
		},err =>{ 
			reply.code(404);
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
	url: '/search',
	handler : function( request, reply ){
		try{
		searchControllerObj.basicsearch( request.query ).then(data => {
			reply.send({'data':data});
		},err =>{ 
			reply.code(404);
			reply.send(err);
		});
	}catch( error ){
		reply.send(error);
	}
	}
},
{
	method: 'GET',
	url: '/search/advance',
	schema: {
		querystring: {
	      movie_name: { type: 'string' },
	      release_year: { type: 'integer' }
	    }
	},    
	handler : function( request, reply ){
		try{
		searchControllerObj.advancesearch( request.query ).then(data => {
			if( data.length > 0 )
				reply.send({'data':data});
			else{
				reply.code(404);
				reply.send("Seems your too high, kindly re-check your filters!!!!");
			}
		},err =>{ 
			reply.code(404);
			reply.send(err);
		});
	}catch( error ){
		reply.send(error);
	}
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