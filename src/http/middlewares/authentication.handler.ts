import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../../infra/models/user.model';
import environment from '../../shared/config/environment';
import ResponseType from '../response/response.type';

@injectable()
class AuthenticationMiddleware extends BaseMiddleware {
    public async handler( req: Request, res: Response, next: NextFunction ) {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json(new ResponseType(false, null, "Login required"));
        }

        const [, token] = authorization.split(' ');

        try {
            const data: any = jwt.verify(token, environment.security.secret);
            const { id, email } = data;

            const user = await UserModel.findOne()
                .where('_id').equals(id)
                .where('email').equals(email);

            if (!user)
                return res.status(401).json(new ResponseType(false, null, "Invalid user"));
            
            req.userId = id;
            req.userEmail = email;

            return next();
        } catch (e) {
            return res.status(401).json(new ResponseType(false, null, "Token expired"));
        }
    }
}

export default AuthenticationMiddleware;