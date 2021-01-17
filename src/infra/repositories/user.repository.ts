import { injectable } from "inversify";
import mongoose from 'mongoose';
import { IUserRepository } from "../../domain/repositories/user.repository.interface";
import UserModel, { IUserModel } from '../models/user.model';

@injectable()
export class UserRepository implements IUserRepository {

    async findByEmail(user: IUserModel): Promise<IUserModel | null> {
        try {
            const result = await UserModel.findOne()
                .where('email').equals(user.email);

            if (result) {
                return {
                    id: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    password: result.password
                };
            }
            else
                return null;
        }
        catch (e) {
            return null;
        }
    }
    
    async create(user: IUserModel): Promise<IUserModel | null> {
        try {
            const result = await UserModel.create(user);

            if (result) {
                return {
                    id: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    password: result.password
                };
            }
            else
                return null;
        }
        catch (e) {
            return null;
        }
    }

    async update(user: IUserModel): Promise<boolean> {
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

    async changePassword(user: IUserModel): Promise<boolean> {
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