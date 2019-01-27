//  const jwtService = 	require('jsonwebtoken');

// const token = jwtService.sign({ sub: 123 }, 'ABCDGUYTJHKJDH5764546HKHUHUH');
// console.log( token );

// const token1 = jwtService.sign({ sub: 456 }, 'ABCDGUYTJHKJDH5764546HKHUHUH');
// console.log( token1 );




const routes = require('./src/routes/');

const fastifyServer = require('fastify')({
	logger : true
});

fastifyServer.register(require('fastify-jwt'), { 
  secret: 'supersecret' 
})
const token = fastifyServer.sign({ sub: 123 } , 'ABCDGUYTJHKJDH5764546HKHUHUH')
console.log( token );


routes.forEach((route, index) => {
 fastifyServer.route(route)
})


const startServer = async () => {
	try{
		await fastifyServer.listen( 3000 );
		fastifyServer.log.info(`Server listening on ${fastifyServer.server.address().port}`)
	}catch( err ){
		fastifyServer.log.error(err);
		process.exit(1);
	}
}

startServer();