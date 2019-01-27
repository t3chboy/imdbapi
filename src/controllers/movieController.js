/**
 * [movieModelClass Class for DB movie table]
 * @type {[type]}
 */
const movieModelClass = require('../models/movieModel');

class movieController {
	
	constructor() {
		this._movieModelObj = new movieModelClass();
	}
	

	/**
	 * [create Create new Movie]
	 * @param  {Json} requestParams [key value pairs with hotel data]
	 * @return {[type]}             [success or error message]
	 */
	create( requestParams ){
		console.log( requestParams );
		return new Promise((resolve,reject)=>{
			this._movieModelObj.create( requestParams )
			.then( data =>{
				return resolve(data);
			},err => {
				return reject(err);
			})
			.catch( err => {
				return reject(err);
			})


		})

	}
}

module.exports = movieController;