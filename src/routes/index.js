const authMiddleService = require('../helpers/authorize');
const movieController = require('../controllers/movieController')
console.log( authMiddleService.createToken('kaushil') );
console.log( authMiddleService.createToken('kaushil') );
const movieControllerObj = new movieController();	



const routes = [
  {
    method: 'POST',
    url: '/movie/create/',
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

    		reply.send({ hello: 'Welcome to imdb' })
  	}
}

]

module.exports = routes;