
const mysqlService = require('../services/mysql_service');

class movieGernesModel{
	
	constructor(){
	}

	/**
	 * [create Create Genres for Movie Data]
	 * @param  {Json} bodyParams [Key value pair for genre Data]
	 * @param  {Number} movieId  [movie for which genre will be created]
	 * @return {[type]}          [Success or Fail Message]
	 */
	create( bodyParams, movieId ){

		return new Promise((resolve,reject)=>{
			this.createGenres( movieId, bodyParams )
			.then(data =>{
				return resolve(data); 
			})
			.catch(error => {
				return reject(error);
			});
		});
		
	}

	createGenres( movieId, bodyParams ){

		return new Promise((resolve,reject)=>{

			let genresData = [];
			if( bodyParams.length >= 1 ){
				
				for( let eachParam of bodyParams ){
					genresData.push([ parseInt(movieId), eachParam.genre ]);	
				}
			}

			const insertQuery = "INSERT INTO room_master ( movie_id, genre ) values  ?  ";
			
			mysqlService.query( insertQuery , [genresData]  , ( error , results, fields )=>{
				
				if (error) {
					return reject([error.code , error.errno, error.sqlMessage]);
				};

				if (results.affectedRows > 0) {
					return resolve('Created successfully.');
				}
				
			})

		});
	}
}
module.exports = movieGernesModel;
