import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { injectable, inject } from "inversify";
import { CreateUserDto } from "../domain/dtos/user/create.user.dto";
import { LoginDto } from "../domain/dtos/user/login.dto";
import { TokenResultDto } from "../domain/dtos/user/token.result.dto";
import { UpdateUserDto } from "../domain/dtos/user/update.user.dto";
import { IUserRepository } from "../domain/repositories/user.repository.interface";
import { IUserService } from "../domain/services/user.service.interface";
import { UserEntity } from "../infra/models/user.model";
import environment from "../shared/config/environment";
import TYPES from "../shared/types";
import { ChangePassword } from '../domain/dtos/user/change.password';

@injectable()
export class UserService implements IUserService {
    @inject(TYPES.IUserRepository) private _userRepository: IUserRepository;

    public generateToken = (user: UserEntity): TokenResultDto => {
        const secret = environment.security.secret;
        const audience = environment.security.audience;
        const issuer = environment.security.issuer;
        const expiration = environment.security.expiration;
        const { id, email, firstName, lastName } = user;
        
        const token = jwt.sign(
            {   
                id,
                email
            },
            secret,
            {
                expiresIn: expiration,
                audience: audience,
                issuer: issuer
            }
        );
        
        return {
            token,
            userEmail: email,
            userName: `${firstName} ${lastName}`
        };
    }

    async login(user: LoginDto): Promise<TokenResultDto | null | undefined> {
        const result = await this._userRepository.login(user);

        if (result && (await bcrypt.compare(user.password, result.password)) == true)
            return this.generateToken(result);
        else null;
    }

    async create(user: CreateUserDto): Promise<TokenResultDto | null | undefined> {
        user.password = bcrypt.hashSync(user.password, 10);

        const result = await this._userRepository.create(user);

        if (result != null)
            return this.generateToken(result);
        else
            return null;
    }

    async update(user: UpdateUserDto): Promise<boolean> {
        return await this._userRepository.update(user);
    }

    async changePassword(user: ChangePassword): Promise<boolean> {
        user.password = bcrypt.hashSync(user.password, 10);
        
        return await this._userRepository.changePassword(user);
    }
}