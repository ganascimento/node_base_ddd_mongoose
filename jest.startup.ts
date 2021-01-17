require('dotenv').config();
import * as jestCli from 'jest-cli';
import request from 'supertest';
import environment from './src/shared/config/environment';
import Server from './src/shared/server';
import UserModel from './src/infra/models/user.model';

let server: Server
let address: string = "http://localhost:3001";

const beforeAllTests = async (): Promise<any> => {
    server = new Server();
    environment.port = process.env.PORT_TEST || "3001";
    environment.database.connectionString = process.env.CONNECTION_STRING_TEST || "mongodb://localhost:27017/testdb";

    await server.start();
    await generateToken();
}

const generateToken = async () => {
    await request(address)
        .post('/user')
        .send({
            firstName: "admin",
            lastName: "admin",
            email: "admin@email.com",
            password: "12345678"
        })
        .then(res => {
            process.env.TOKEN_TEST = `Bearer ${res.body.data.token}`;
        });
}

const afterAllTests = async () => {
    await UserModel.deleteMany({});
    server.shutdown();
}

beforeAllTests()
    .then(() => jestCli.run()
    .then(() => afterAllTests()))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });