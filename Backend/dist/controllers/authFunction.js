"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = void 0;
const jwt = require('jsonwebtoken');
const tokenValidation = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json('No puedes ingresar');
    try {
        const verificado = jwt.verify(token, 'itsSomeRandomToTheSecretKey');
        console.log(verificado);
        next();
    }
    catch (err) {
        res.status(400).send('Token invalido');
    }
};
exports.tokenValidation = tokenValidation;
//# sourceMappingURL=authFunction.js.map