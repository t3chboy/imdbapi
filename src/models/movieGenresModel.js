
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
			if( bodyParams.genre.length >= 1 ){
				
				for( let eachParam of bodyParams.genre ){
					genresData.push([ parseInt(movieId), eachParam ]);	
				}
			}

			const insertQuery = "INSERT INTO movies_genres ( movie_id, genre ) values  ?  ";
			
			mysqlService.query( insertQuery , [genresData]  , ( error , results, fields )=>{
				
				if (error) {
					return reject([error.code , error.errno, error.sqlMessage]);
				};

				if (results.affectedRows > 0) {
					return resolve('Created successfully.');
				}
			});
		});
	}


	deleteData( movieId ){

		return new Promise(( resolve, reject ) => {

			const deleteQuery = " delete from movies_genres where movie_id = ? ";

			mysqlService.query( deleteQuery , movieId , ( error, results,  fields ) => {
				console.log( results );
				console.log( error );
				if( error ){
					return reject([error.code , error.errno, error.sqlMessage]);
				};
				//todo check if genre exists
				if (results.affectedRows > 0) {
					return resolve('Deleted successfully.');
				}
			});
		});
	}
}
module.exports = movieGernesModel;
