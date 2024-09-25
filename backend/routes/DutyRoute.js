const express = require('express');
const router = express.Router();
const Duty = require('../models/Duty');

router.route('/addduty').post(async (req, res) => {

    const {
        employeeId,
        dutyDate,
        vehicleId,
        startLocation,
        endLocation,
        distance,
        dutyStatus,
        shift,
        notes,
    } = req.body;

    const newDuty = new Duty({

        employeeId,
        dutyDate,
        vehicleId,
        startLocation,
        endLocation,
        distance,
        dutyStatus,
        shift,
        notes,

    });

    try {

        await newDuty.save();
        return res.status(200).json({ status: "Duty is added successfully" });

    } catch (error) {

        return res.status(500).json({ status: "Error with adding duty", messsage: error });
    }
});




module.exports = router;