import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import container from "./inversify.config";
import * as dotenv from "dotenv";
import * as mysql from 'mysql';
import { Datasource } from './infrastructure/Datasource';
import { InversifyExpressServer, interfaces, TYPE } from "inversify-express-utils";

import './controllers/admin.controller';
import './controllers/user.controller';


const app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

dotenv.config();

let server =  new InversifyExpressServer(container, null, { rootPath: "/api" }, app);

let appConfigured = server.build();

let serve = appConfigured.listen(process.env.PORT || 3000, () => `App running on ${serve.address().port}`);