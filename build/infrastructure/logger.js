"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var log4js_1 = require("log4js");
var environment = {
    nodeEnv: process.env.ENV || process.env.NODE_ENV,
    logDir: process.env.LOG_DIR || 'logs',
    logLevel: process.env.LOG_LEVEL || 'info',
    logFile: process.env.LOG_FILE || 'app.log',
};
// appenders
log4js_1.configure({
    appenders: {
        console: { type: 'stdout', layout: { type: 'colored' } },
        dateFile: {
            type: 'dateFile',
            filename: environment.logDir + "/" + environment.logFile,
            layout: { type: 'basic' },
            compress: true,
            daysToKeep: 14,
            keepFileExt: true
        }
    },
    categories: {
        default: { appenders: ['console', 'dateFile'], level: environment.logLevel }
    }
});
// fetch logger and export
exports.logger = log4js_1.getLogger();
//# sourceMappingURL=logger.js.map