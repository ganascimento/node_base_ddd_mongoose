import { IUserModel } from '../../infra/models/user.model';

export interface IUserRepository {
    findByEmail(user: IUserModel): Promise<IUserModel | null>;
    create(user: IUserModel): Promise<IUserModel | null>;
    update(user: IUserModel): Promise<boolean>;
    changePassword(user: IUserModel): Promise<boolean>;
}