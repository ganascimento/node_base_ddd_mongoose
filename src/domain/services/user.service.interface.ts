import { ChangePassword } from '../dtos/user/change.password';
import { CreateUserDto } from '../dtos/user/create.user.dto';
import { LoginDto } from '../dtos/user/login.dto';
import { TokenResultDto } from '../dtos/user/token.result.dto';
import { UpdateUserDto } from '../dtos/user/update.user.dto';

export interface IUserService {
    login(user: LoginDto): Promise<TokenResultDto | null>;
    create(user: CreateUserDto): Promise<TokenResultDto | null>;
    update(user: UpdateUserDto): Promise<boolean>;
    changePassword(user: ChangePassword): Promise<boolean>;
}