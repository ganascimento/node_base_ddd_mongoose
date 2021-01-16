import mongoose from 'mongoose';
import environment from '../config/environment';

class DbMongo {
    connect(): Promise<any> {
        return mongoose.connect(environment.database.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    }
}

export default DbMongo;