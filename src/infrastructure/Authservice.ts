import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { BaseMiddleware } from 'inversify-express-utils';

export class AuthService extends BaseMiddleware {

    public async handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const token = <string>req.headers['auth-token'];

        try {
            let sKey = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'zWl2q9mLLTwzL_Fu-7xDy4vQ_Ivujia5KQMsInepVXhaNYIgaaPy_90BWbxzuJ5zkLT2UX1mXB1YMpMrUuWLiw';

            if(!token) {
                res.status(401).json('Unauthorized');
                return;
            }

            await jwt.verify(token, sKey, function(err: any, user: any): any {
                if (err) {
                    res.status(400).json('Invalid token');
                    return;
                }
                
                if(user && user.role !== 'admin') {
                    res.status(401).json('Unauthorized');
                    return;
                }
            });

            next();
        } catch (err) {
            res.status(400).json('Error while parsing token');
            return;
        }
    }
}