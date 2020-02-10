const jwt = require("jsonwebtoken");

function signToken(obj, key) {
	return jwt.sign(obj, key);
}

function verifyToken(token, key) {
	return jwt.verify(token, key);
}

module.exports = {signToken, verifyToken};
