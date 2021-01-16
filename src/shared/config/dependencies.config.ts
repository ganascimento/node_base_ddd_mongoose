import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "../types";
import { IUserService } from '../../domain/services/user.service.interface';
import { UserService } from '../../services/user.service';
import { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { UserRepository } from "../../infra/repositories/user.repository";
import AuthenticationMiddleware from "../../http/middlewares/authentication.handler";
import ValidErrorMiddleware from "../../http/middlewares/validError.handler";

const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<AuthenticationMiddleware>(AuthenticationMiddleware).toSelf();
container.bind<ValidErrorMiddleware>(ValidErrorMiddleware).toSelf();

export default container;
