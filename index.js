//  const jwtService = 	require('jsonwebtoken');

// const token = jwtService.sign({ sub: 123 }, 'ABCDGUYTJHKJDH5764546HKHUHUH');
// console.log( token );

// const token1 = jwtService.sign({ sub: 456 }, 'ABCDGUYTJHKJDH5764546HKHUHUH');
// console.log( token1 );



const routes = require('./src/routes/');

const fastify = require('fastify')({
	logger : true
});




routes.forEach((route, index) => {
 fastify.route(route)
})


const startServer = async () => {
	try{
		await fastify.listen( 3000 );
		fastify.log.info(`Server listening on ${fastify.server.address().port}`)
	}catch( err ){
		fastify.log.error(err);
		process.exit(1);
	}
}

startServer();