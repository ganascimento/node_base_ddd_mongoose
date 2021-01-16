import { Request, Response, NextFunction } from 'express';
import ResponseType from '../../http/response/response.type';

const globalException = async (err: Error, req: Request, resp: Response, next: NextFunction) => {
    const response = new ResponseType(false, null, err.message);

    resp.status(400).json(response);
}

export default globalException;