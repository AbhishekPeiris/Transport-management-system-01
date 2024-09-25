const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.route('/register').post(async (req, res) => {

    const {
        firstname,
        lastname,
        dob,
        address,
        gender,
        contact,
        email,
        password,
        status,
        role
    } = req.body;

    const newEmployee = new Employee({

        firstname,
        lastname,
        dob,
        address,
        gender,
        contact,
        email,
        password,
        status,
        role

    });

    try {

        await newEmployee.save();
        return res.status(200).json({ status: "Employee is registered successfully" });

    } catch (error) {

        return res.status(500).json({ status: "Error with register employee", messsage: error });
    }
});



module.exports = router;