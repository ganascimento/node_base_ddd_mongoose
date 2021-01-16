require('dotenv').config();
import "reflect-metadata";
import '../http/controllers/user.controller';
import express from 'express';
import { InversifyExpressServer } from "inversify-express-utils";
import environment from './config/environment';
import errorConfig from './config/error.config';
import container from './config/dependencies.config';
import DbMongo from './db/db.mongo';

class Server {
    start() {
        const server: InversifyExpressServer = new InversifyExpressServer(container);
        const dbMongo: DbMongo = new DbMongo();

        server.setConfig(app => {
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
        });

        server.setErrorConfig(app => {
            app.use(errorConfig);
        });

        const app = server.build();

        dbMongo.connect()
            .then(() => {
                app.listen(environment.port, () => {
                    console.log(`server running in port ${environment.port}`);
                });
            })
            .catch(() => {
                console.log('Erro to connect with MongoDB');
            });
    }
}

export default Server;