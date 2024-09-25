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


router.route('/login').post(async (req, res) => {

    const {
        email,
        password
    } = req.body;

    try {
        const employee = await Employee.findOne({ email: email, password: password });

        if (employee) {

            const loginEmployee = {

                _id: employee._id,
                firstname: employee.firstname,
                lastname: employee.lastname,
                dob: employee.dob,
                address: employee.address,
                gender: employee.gender,
                contact: employee.contact,
                email: employee.email,
                password: employee.password,
                status: employee.status,
                role: employee.role,

            }

            return res.status(200).json({ status: "Login Success", loginEmployee });
        }
        else {
            return res.status(500).json({ status: "The email or password is incorrect" });
        }

    } catch (error) {
        return res.status(500).json({ status: "Error during login", message: error });
    }
});

router.route('/editemployee/:id').put(async (req, res) => {

    const employeeId = req.params.id;

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

    const updateEmployee = {

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
    }

    try {

        await Employee.findByIdAndUpdate(employeeId, updateEmployee);
        return res.status(200).json({ status: "Employee updated" });

    } catch (error) {

        return res.status(500).json({ status: "Error with update employee", message: error });

    }
});

router.route('/deleteemloyee/:id').delete(async (req, res) => {

    const employeeId = req.params.id;

    try {

        await Employee.findByIdAndDelete(employeeId);
        return res.status(200).json({ status: "Employee is deleted" });

    } catch (error) {

        return res.status(400).json({ status: "Error with delete employee", message: error });

    }
});

router.route('/getemployee').post(async (req, res) => {

    try {

        const employee = await Employee.find();

        if (!employee) {
            return res.status(404).json({ status: "Employees not found" });
        }

        return res.status(200).json({ status: "Employees are fatched", employee });

    } catch (error) {

        return res.status(500).json({ status: "Error with fetch employees", message: error });

    }
});

module.exports = router;