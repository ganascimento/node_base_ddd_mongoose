import { Document, Schema, model } from 'mongoose';

interface IUserBase {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUserModel extends Partial<IUserBase> {
    id?: string;
}

interface IUserDocument extends IUserBase, Document {}

const UserSchema = new Schema<IUserDocument>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default model('User', UserSchema);