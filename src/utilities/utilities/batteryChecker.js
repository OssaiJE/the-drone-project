"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var dotenv_1 = require("dotenv");
var node_cron_1 = require("node-cron");
var log4js = require("log4js");
var DroneModel_1 = require("../database/models/DroneModel");
(0, dotenv_1.config)();
var logBatteryLevel = process.env.logBatteryLevel;
// Configure logger
log4js.configure({
    appenders: { BatteryLevel: { type: 'file', filename: logBatteryLevel } },
    categories: { default: { appenders: ['BatteryLevel'], level: 'info' } }
});
var logger = log4js.getLogger('BatteryLevel');
// Function to check drone battery levels and create history/audit event logs
function checkBatteryLevelsAndCreateLogs() {
    return __awaiter(this, void 0, void 0, function () {
        var drones, _i, drones_1, drone, batteryLevel, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, DroneModel_1.default.find()];
                case 1:
                    drones = _a.sent();
                    for (_i = 0, drones_1 = drones; _i < drones_1.length; _i++) {
                        drone = drones_1[_i];
                        batteryLevel = drone.batteryCapacity;
                        // Create a history/audit event log for the battery level
                        logger.info('DRONE_SERIALNUMBER: ', drone.serialNumber, 'BATTERY_LEVEL: ', batteryLevel);
                        if (batteryLevel <= 10) {
                            logger.info('DRONE_SERIALNUMBER: ', drone.serialNumber, 'BATTERY_CRITICAL', batteryLevel);
                        }
                        if (batteryLevel <= 25) {
                            logger.warn('DRONE_SERIALNUMBER: ', drone.serialNumber, 'BATTERY_LOW: ', batteryLevel);
                        }
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    logger.error('Error occurred while checking battery levels:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Schedule the task to run every half hour
var startCronJob = function () {
    node_cron_1.default.schedule('0 *,30 * * * *', function () {
        checkBatteryLevelsAndCreateLogs();
    });
};
exports.default = startCronJob;
