"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express = require("express");
var bodyParser = require("body-parser");
var inversify_config_1 = require("./inversify.config");
var dotenv = require("dotenv");
var inversify_express_utils_1 = require("inversify-express-utils");
require("./controllers/admin.controller");
require("./controllers/user.controller");
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
dotenv.config();
var server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default, null, { rootPath: "/api" }, app);
var appConfigured = server.build();
var serve = appConfigured.listen(process.env.PORT || 3000, function () { return "App running on " + serve.address().port; });
//# sourceMappingURL=app.js.map