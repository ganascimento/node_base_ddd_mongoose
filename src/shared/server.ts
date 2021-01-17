require('dotenv').config();
import "reflect-metadata";
import '../http/controllers/user.controller';
import express from 'express';
import { InversifyExpressServer } from "inversify-express-utils";
import environment from './config/environment';
import errorConfig from './config/error.config';
import container from './config/dependencies.config';
import DbMongo from './db/db.mongo';
import http from 'http';

class Server {
    private server: http.Server;
    private dbMongo: DbMongo = new DbMongo();

    async start(): Promise<any> {
        const server: InversifyExpressServer = new InversifyExpressServer(container);

        server.setConfig(app => {
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
        });

        server.setErrorConfig(app => {
            app.use(errorConfig);
        });

        const app = server.build();

        try {
            await this.dbMongo.connect();
            this.server = app.listen(environment.port, () => {
                console.log(`server running in port ${environment.port}`);
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    async shutdown() {
        await this.dbMongo.disconnect();
        this.server.close();
    }
}

export default Server;