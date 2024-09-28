const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Mark attendance
router.post('/mark', async (req, res) => {
    const { employeeId, date } = req.body;
    try {
        const attendance = new Attendance({ employeeId, date });
        await attendance.save();
        res.status(200).json({ status: "Attendance marked successfully" });
    } catch (error) {
        res.status(500).json({ status: "Error marking attendance", message: error.message });
    }
});

// Get attendance for a specific employee
router.get('/:employeeId', async (req, res) => {
    try {
        const attendance = await Attendance.find({ employeeId: req.params.employeeId })
            .sort({ date: -1 })
            .limit(30); // Last 30 days
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ status: "Error fetching attendance", message: error.message });
    }
});

// Get all attendance records (for admin view)
router.get('/', async (req, res) => {
    try {
        const attendance = await Attendance.find().sort({ date: -1 }).limit(100);
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ status: "Error fetching all attendance records", message: error.message });
    }
});

module.exports = router;