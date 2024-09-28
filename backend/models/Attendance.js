const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'],
        default: 'Present'
    },
    checkInTime: {
        type: Date,
        default: Date.now
    },
    checkOutTime: {
        type: Date
    },
    duration: {
        type: Number,
        default: 0  // Duration in minutes
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Create a compound index on employeeId and date to ensure uniqueness
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

// Method to calculate duration when checking out
AttendanceSchema.methods.checkOut = function () {
    this.checkOutTime = new Date();
    this.duration = Math.round((this.checkOutTime - this.checkInTime) / 60000); // Convert ms to minutes
    return this.save();
};

const Attendance = mongoose.model('attendances', AttendanceSchema);

module.exports = Attendance;