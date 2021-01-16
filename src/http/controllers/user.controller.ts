import { inject } from "inversify";
import { httpPost, httpPut, BaseHttpController, interfaces, controller, request, response } from "inversify-express-utils";
import { Request, Response } from 'express';
import TYPES from '../../shared/types';
import { IUserService } from '../../domain/services/user.service.interface';
import AuthenticationMiddleware from "../middlewares/authentication.handler";
import { LoginDto } from "../../domain/dtos/user/login.dto";
import ResponseType from "../response/response.type";
import { loginValid, createValid, updateValid, changePasswordValid } from "../validations/user.validation";
import ValidErrorMiddleware from "../middlewares/validError.handler";
import { CreateUserDto } from "../../domain/dtos/user/create.user.dto";
import { UpdateUserDto } from "../../domain/dtos/user/update.user.dto";
import { ChangePassword } from "../../domain/dtos/user/change.password";

@controller('/user')
export class UserController extends BaseHttpController implements interfaces.Controller {
    @inject(TYPES.IUserService) private _userService: IUserService;

    @httpPost('/auth', ...loginValid, ValidErrorMiddleware)
    public async login(@request() req: Request<any, any, LoginDto>, @response() res: Response) {
        const result = await this._userService.login({ ...req.body });

        if (result)
            return res.status(200).json(new ResponseType(true, result));
        else
            return res.status(400).json(new ResponseType(false, "Invalid credentials"));
    }

    @httpPost('/', ...createValid, ValidErrorMiddleware)
    public async create(@request() req: Request<any, any, CreateUserDto>, @response() res: Response) {
        const result = await this._userService.create({ ...req.body });

        if (result)
            return res.status(200).json(new ResponseType(true, result));
        else
            return res.status(400).json(new ResponseType(false));
    }

    @httpPut('/', AuthenticationMiddleware, ...updateValid, ValidErrorMiddleware)
    public async update(@request() req: Request<any, any, UpdateUserDto>, @response() res: Response) {
        const result = await this._userService.update({            
            ...req.body,
            id: req.userId
         });

        if (result)
            return res.status(200).json(new ResponseType(true, result));
        else
            return res.status(400).json(new ResponseType(false));
    }

    @httpPut('/password', AuthenticationMiddleware, ...changePasswordValid, ValidErrorMiddleware)
    public async changePassword(@request() req: Request<any, any, ChangePassword>, @response() res: Response) {
        const result = await this._userService.changePassword({ 
            ...req.body,
            id: req.userId
         });

        if (result)
            return res.status(200).json(new ResponseType(true, result));
        else
            return res.status(400).json(new ResponseType(false));
    }
}