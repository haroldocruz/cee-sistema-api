
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

//verificacao simples de token
module.exports = (req, res, next) => {
    const authHeaders = req.headers.authorization;

    //se o token foi informado
    if(!authHeader)
        return res.status(401).send({error: 'No token provided'});

    const parts = authHeaders.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({error: 'Token error'});

    const [scheme, token] = parts;

    //regex: se o token possui a palavra Bearer
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: 'Token bad formatted'});

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ erro: 'Token invalid'});

        req.userId = decoded.id;

        return next();
    });
}