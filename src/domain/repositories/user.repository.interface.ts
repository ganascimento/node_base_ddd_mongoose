import { UserEntity } from '../../infra/models/user.model';
import { ChangePassword } from '../dtos/user/change.password';
import { CreateUserDto } from '../dtos/user/create.user.dto';
import { LoginDto } from '../dtos/user/login.dto';
import { UpdateUserDto } from '../dtos/user/update.user.dto';

export interface IUserRepository {
    login(user: LoginDto): Promise<UserEntity | null>;
    create(user: CreateUserDto): Promise<UserEntity | null>;
    update(user: UpdateUserDto): Promise<boolean>;
    changePassword(user: ChangePassword): Promise<boolean>;
}