"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Drone Model
var droneSchema = new mongoose_1.Schema({
    serialNumber: {
        type: String,
        maxlength: 100,
        required: true,
        unique: true
    },
    model: {
        type: String,
        enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight']
    },
    weightLimit: {
        type: Number,
        min: 0,
        max: 500
    },
    batteryCapacity: {
        type: Number,
        min: 0,
        max: 100
    },
    state: {
        type: String,
        enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING']
    },
    medicationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Medication'
    }
});
var Drone = (0, mongoose_1.model)('Drone', droneSchema);
exports.default = Drone;
