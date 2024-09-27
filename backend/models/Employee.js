const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const employeeSchema = new Schema({

    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required: true,
    },
    address : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'],
        default: 'Active',
    },
    role : {
        type : String,
        required: true,
        enum: ['Driver', 'Admin', 'Supervisor', 'Mechanic', 'Other']
    }
});

const Employee = mongoose.model('employees', employeeSchema);

module.exports = Employee;