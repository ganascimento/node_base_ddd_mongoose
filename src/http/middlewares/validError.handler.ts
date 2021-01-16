import { injectable } from 'inversify';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import ResponseType from '../response/response.type';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
class ValidErrorMiddleware extends BaseMiddleware {
    public handler( req: Request, res: Response, next: NextFunction ) {
        const validErros = validationResult(req);

        if (!validErros.isEmpty()) {
            return res.status(400).json(new ResponseType(false, null, 'Validation error!', validErros.array()));
        }
        else {
            next();
        }
    }
}

export default ValidErrorMiddleware;