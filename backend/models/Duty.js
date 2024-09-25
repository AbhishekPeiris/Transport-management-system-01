const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dutySchema = new Schema({

    employeeId: {
        type: String,
        required: true,
    },
    dutyDate: {
        type: Date,
        required: true,
    },
    vehicleId: {
        type: String,
        required: true,
    },
    startLocation: {
        type: String,
        required: true,
    },
    endLocation: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    dutyStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    shift: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Night'],
        required: true,
    },
    notes: {
        type: String,
        required: true,
    }

});

const Duty = mongoose.model('duties', dutySchema);

module.exports = Duty;