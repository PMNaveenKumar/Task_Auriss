"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
var express = require("express");
var inversify_express_utils_1 = require("inversify-express-utils");
var inversify_1 = require("inversify");
var types_1 = require("../types");
var Validator_1 = require("../validator/Validator");
var logger_1 = require("../infrastructure/logger");
var AdminController = /** @class */ (function (_super) {
    __extends(AdminController, _super);
    function AdminController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdminController.prototype.registerUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, email, address, response_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        username = Validator_1.Validator.IsValidUserName(req.userName);
                        if (!username.valid) {
                            logger_1.logger.error(username.errorMessage);
                            res.status(400).json(username.errorMessage);
                            return [2 /*return*/];
                        }
                        password = Validator_1.Validator.IsValidPassword(req.password);
                        if (!password.valid) {
                            logger_1.logger.error(password.errorMessage);
                            res.status(400).json(password.errorMessage);
                            return [2 /*return*/];
                        }
                        email = Validator_1.Validator.IsValidEmail(req.email);
                        if (!email.valid) {
                            logger_1.logger.error(email.errorMessage);
                            res.status(400).json(email.errorMessage);
                            return [2 /*return*/];
                        }
                        address = Validator_1.Validator.IsValidAddress({
                            address1: req.address.address1,
                            address2: req.address.address2,
                            pincode: req.address.pincode
                        });
                        if (!address.valid) {
                            logger_1.logger.error(address.errorMessage);
                            res.status(400).json(address.errorMessage);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.adminService.registerUser(req)];
                    case 1:
                        response_1 = _a.sent();
                        res.status(200).json(response_1);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        logger_1.logger.error(error_1);
                        res.status(400).json(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminController.prototype.updateUser = function (userId, body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var validId, password, email, response_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        validId = Validator_1.Validator.isValidUserId(userId);
                        if (!validId.valid) {
                            logger_1.logger.error(validId.errorMessage);
                            res.status(400).json(validId.errorMessage);
                        }
                        password = Validator_1.Validator.IsValidPassword(body.password);
                        if (!password.valid) {
                            logger_1.logger.error(password.errorMessage);
                            res.status(400).json(password.errorMessage);
                            return [2 /*return*/];
                        }
                        email = Validator_1.Validator.IsValidEmail(body.email);
                        if (!email.valid) {
                            logger_1.logger.error(email.errorMessage);
                            res.status(400).json(email.errorMessage);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.adminService.updateUser(userId, { password: body.password, email: body.email })];
                    case 1:
                        response_2 = _a.sent();
                        res.status(200).json(response_2);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        logger_1.logger.error(error_2);
                        res.status(400).json(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(types_1.default.IAdminService),
        __metadata("design:type", Object)
    ], AdminController.prototype, "adminService", void 0);
    __decorate([
        inversify_express_utils_1.httpPost("/", types_1.default.AuthService),
        __param(0, inversify_express_utils_1.requestBody()), __param(1, inversify_express_utils_1.response()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AdminController.prototype, "registerUser", null);
    __decorate([
        inversify_express_utils_1.httpPut('/user/:id', types_1.default.AuthService),
        __param(0, inversify_express_utils_1.requestParam('id')), __param(1, inversify_express_utils_1.requestBody()), __param(2, inversify_express_utils_1.response()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Object]),
        __metadata("design:returntype", Promise)
    ], AdminController.prototype, "updateUser", null);
    AdminController = __decorate([
        inversify_express_utils_1.controller("/admin")
    ], AdminController);
    return AdminController;
}(inversify_express_utils_1.BaseHttpController));
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map