const { signToken, verifyToken } = require("../helpers/jwt");
const createError = require("http-errors");
const { User } = require("../models");

class Controller {
	static login(req, res, next) {
		const email = req.body.email;
		const password = req.body.password;
		const where = {
			where: {
				email: email
			}
		}
		User.findOne(where)
			.then(data => {
				if (!data) {
					next(createError(404, "User not found!"));
				} else {
					const obj = {
						id: data.id,
						email: data.id
					}
					const token = signToken(obj, process.env.JWT_KEY);
					res.status(200).json({ token: token });
				}
			})
			.catch(err => {
				next(createError(404), "User not found!");
			});
	}
	static register(req, res, next) {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		const obj = {
			name: name,
			email: email,
			password: password
		}
		User.create(obj)
			.then(data => {
				res.status(401).json(data);
			})
			.catch(err => {
				next(createError(400), err);
			});

	}
};

module.exports = Controller;
