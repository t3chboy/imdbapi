const movieController = require('../controllers/movieController')

const movieControllerObj = new movieController();	

const fastify = require('fastify');
const fp = require("fastify-plugin")
 
module.exports = fp(async function(fastify, opts) {
  fastify.register(require("fastify-jwt"), {
    secret: "supersecret"
  })
 
  fastify.decorate("authenticate", async function(request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
});


const routes = [
  {
    method: 'POST',
    url: '/movie/create/',
    preHandler: [fastify.authenticate],
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
	method: 'GET',
	url: '/',
	handler: function (request, reply) {
		const token = jwtSign({ 	foo: 'bar'  })
  		reply.send({ token })
    	//reply.send({ hello: 'Welcome to imdb' })
  	}
}

]

module.exports = routes;