import mongoose from 'mongoose';
import environment from '../config/environment';

class DbMongo {
    async connect() {
        await mongoose.connect(environment.database.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}

export default DbMongo;