"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var inversify_1 = require("inversify");
// import { interfaces, TYPE } from 'inversify-express-utils';
var UserRepo_1 = require("./repository/UserRepo");
var Admin_service_1 = require("./infrastructure/Admin.service");
var User_service_1 = require("./infrastructure/User.service");
var Datasource_1 = require("./infrastructure/Datasource");
var Authservice_1 = require("./infrastructure/Authservice");
var container = new inversify_1.Container();
container.bind(types_1.default.IUserRepo).to(UserRepo_1.UserRepo).inSingletonScope();
container.bind(types_1.default.IAdminService).to(Admin_service_1.AdminService).inSingletonScope();
container.bind(types_1.default.IUserService).to(User_service_1.UserService).inSingletonScope();
container.bind(types_1.default.Datasource).to(Datasource_1.Datasource).inSingletonScope();
container.bind(types_1.default.AuthService).to(Authservice_1.AuthService).inSingletonScope();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map