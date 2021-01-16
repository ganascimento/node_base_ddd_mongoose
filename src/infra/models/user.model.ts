import { Document, Schema, model } from 'mongoose';

export interface UserEntity extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<UserEntity>({
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