const {verifyToken} = require("../helpers/jwt");
const createError = require("http-errors");
const {User, i} = require("../models");

function authentication(req, res, next) {
	try{
		const token = req.headers.token;
		const verify = verifyToken(token, process.env.JWT_KEY);
		req.LoggedId = verify.id;
		req.email = verify.email;
		User.findByPk(verify.id)
		.then(data => {
			console.log();
			if(!data) {
				next(createError(404, "User not found!"));
			} else {
				next();
			}
		})
		.catch(err => {
			next(createError(404, "User not found!"));
		})

	} catch(err) {
		next(createError(403, "Not authentication"));
	}
}

module.exports = {authentication};
