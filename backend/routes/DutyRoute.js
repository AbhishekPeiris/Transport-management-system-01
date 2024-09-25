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

router.route('/getduty').post(async (req, res) => {

    try {

        const duties = await Duty.find();

        if (!duties) {
            return res.status(404).json({ status: "Duties not found" });
        }

        return res.status(200).json({ status: "Duties are fatched", duties });

    } catch (error) {

        return res.status(500).json({ status: "Error with fetch duties", message: error });

    }
});

router.route('/getduty/:id').get(async (req, res) => {
    const dutyId = req.params.id;

    try {
        // Use MongoDB's $in operator to check if the province is in the region array
        const duties = await Duty.findOne({ _id: dutyId });

        if (!duties) {
            return res.status(404).json({ status: "Duties not found" });
        }

        return res.status(200).json({ status: "Duties is fetched", duties });

    } catch (error) {
        return res.status(500).json({ status: "Error with fetch duties", message: error });
    }
});

router.route('/editduty/:id').put(async (req, res) => {

    const dutyId = req.params.id;

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

    const updateDuty = {

        employeeId,
        dutyDate,
        vehicleId,
        startLocation,
        endLocation,
        distance,
        dutyStatus,
        shift,
        notes,
    }

    try {

        await Duty.findByIdAndUpdate(dutyId, updateDuty);
        return res.status(200).json({ status: "Duty updated" });

    } catch (error) {

        return res.status(500).json({ status: "Error with update duty", message: error });

    }
});

router.route('/deleteduty/:id').delete(async (req, res) => {

    const dutyId = req.params.id;

    try {

        await Duty.findByIdAndDelete(dutyId);
        return res.status(200).json({ status: "Duty is deleted" });

    } catch (error) {

        return res.status(400).json({ status: "Error with delete duty", message: error });

    }
});


module.exports = router;