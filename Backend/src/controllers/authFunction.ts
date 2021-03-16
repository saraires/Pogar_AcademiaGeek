const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('No puedes ingresar');

    try {
        const verificado = jwt.verify(token, 'itsSomeRandomToTheSecretKey');
        console.log(verificado);
    } catch (err) {
        res.status(400).send('Token invalido');
    }

    next();
}