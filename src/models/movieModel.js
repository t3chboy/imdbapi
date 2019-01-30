/**
 * [mysqlService Mysql service]
 * @type {[type]}
 */
const mysqlService = require('../services/mysql_service');
const movieGernesModel = require('./movieGenresModel');

class movieModel {
	constructor() {
		this._movieGernesModelObj = new movieGernesModel();
	}

	/**
	 * [create Create New movie]
	 * @param  {Json} requestParams [Key value pairs of movie data]
	 * @return {[type]}             [Success or Fail message]
	 */
	create( requestParams ){

		return new Promise((resolve,reject)=>{
			
			const movieData = [ requestParams.name, requestParams.year, requestParams.rank, requestParams.director ];

			const insertQuery = "INSERT INTO movies ( name, year, rank, director_name ) values ( ? , ? , ? , ?  ) ";
			
			mysqlService.query( insertQuery , movieData , ( error , results, fields )=>{
				
				if (error) {
					return reject([error.code , error.errno, error.sqlMessage]);
				};

				if (results.affectedRows == 1) {
					this._movieGernesModelObj.create( requestParams, results.insertId )
					.then(() => {
						return resolve('Movie Created successfully.');
					},err => {
						return reject( err );
					})
					.catch( err => {
						return reject(err);
					})
				}
				
			})	


		});

	}

	/**
	 * [delete Soft delete hotel]
	 * @param  {[type]} requestParams [description]
	 * @return {[type]}               [description]
	 */
	delete(movieId) {
		let self = this;
		return new Promise((resolve, reject) => {
			self.exists(movieId)
				.then(()=>{
					return self.deleteData(movieId)
				})
				.then(data => {
					return resolve(data);
				}, error => {
					return reject(error);
				})
		});
	}

	/**
	 * [update Update Hotel Data]
	 * @param  {Number} hotelid     [Unique Id of hotel]
	 * @param  {Json} requestParams [Key value pairs of hotel data]
	 * @return {[type]}             [success or error message]
	 */
	update(hotelId,requestParams){
		let self = this;
		return new Promise((resolve,reject)=>{
			self.exists(hotelId)
			.then(()=>{
				return self.updateHotel(hotelId,requestParams)
			})		
			.then( data => {
				return resolve(data);
			},error => {
				return reject(error)
			});
		});

	}

	updateHotel(hotelId,requestParams){

		return new Promise((resolve,reject)=>{
			let updateData = {
				name : requestParams.name,
				city : requestParams.city,
				state : requestParams.state,
				address : requestParams.address,
				total_room_count : requestParams.total_room_count
			}
			

			let whereClause = { id : hotelId  }
			let updateQuery = "UPDATE hotel_master set ? where ? ";

			mysqlService.query( updateQuery , [ updateData , whereClause ], ( error, results ) =>{

				if (error) {
					return reject([error.code , error.errno, error.sqlMessage]);
				};
				if (results.affectedRows == 1) {
					return resolve('Updated successfully.');
				}
			})

		});

	}

	deleteData( movieId ) {

		return new Promise((resolve, reject) => {
			let deleteRowId = movieId ;

			this._movieGernesModelObj.deleteData( movieId )
					.then(() => {

						let deleteQuery = "delete from movies where id = ? ";
						mysqlService.query(deleteQuery, deleteRowId, (error, results) => {
						
							if (error) {
								return reject([error.code , error.errno, error.sqlMessage]);
							};
							if (results.affectedRows == 1) {
								return resolve('Movie Deleted successfully.');
							}
						});
					},err => {
						return reject( err );
			}).catch( err => {
						return reject(err);
			})








		});

	}

	exists( movieId ) {

		return new Promise((resolve, reject) => {
			let selectQuery = "select id from movies where id= ?  ";
				mysqlService.query(selectQuery, movieId , (error, results, fields) => {
					if (error) {
						return reject([error.code , error.errno, error.sqlMessage]);
					} else if (results.length == 0) {
						return reject("Movie Not Found");
					} else {
						return resolve(true);
					}

				});
			});

	}
}
module.exports = movieModel;