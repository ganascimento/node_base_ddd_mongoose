import { injectable } from "inversify";
import mongoose from 'mongoose';
import { ChangePassword } from "../../domain/dtos/user/change.password";
import { CreateUserDto } from "../../domain/dtos/user/create.user.dto";
import { LoginDto } from "../../domain/dtos/user/login.dto";
import { UpdateUserDto } from "../../domain/dtos/user/update.user.dto";
import { IUserRepository } from "../../domain/repositories/user.repository.interface";
import UserModel, { UserEntity } from '../models/user.model';

@injectable()
export class UserRepository implements IUserRepository {

    async login(user: LoginDto): Promise<UserEntity | null> {
        try {
            const result = await UserModel.findOne()
                .where('email').equals(user.email);
            
            return result;
        }
        catch (e) {
            return null;
        }
    }
    
    async create(user: CreateUserDto): Promise<UserEntity | null> {
        try {
            const result = await UserModel.create(user);

            return result;
        }
        catch (e) {
            return null;
        }
    }

    async update(user: UpdateUserDto): Promise<boolean> {
        try {
            await UserModel.updateOne({
                _id: new mongoose.mongo.ObjectId(user.id)
            }, {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });

            return true;
        }
        catch (e) {
            return false;
        }
    }

    async changePassword(user: ChangePassword): Promise<boolean> {
        try {
            await UserModel.updateOne({
                _id: new mongoose.mongo.ObjectId(user.id)
            }, {
                $set: {
                    password: user.password
                }
            });

            return true;
        }
        catch (e) {
            return false;
        }
    }

}