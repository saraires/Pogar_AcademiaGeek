const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    if (!token) return res.status(401).json('No puedes ingresar');

    try {
        const verificado = jwt.verify(token, 'itsSomeRandomToTheSecretKey');
        console.log(verificado);
        next();
    } catch (err) {
        res.status(400).send('Token invalido');
    }
}