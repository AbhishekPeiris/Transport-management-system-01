const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

app.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
});

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection successfully');
});

const EmployeeRoute = require('./routes/EmployeeRoute');
const DutyRoute = require('./routes/DutyRoute');
const AttendanceRoute = require('./routes/AttendanceRoute');



app.use('/api/employee', EmployeeRoute);
app.use('/api/duty', DutyRoute);
app.use('/api/attendance', AttendanceRoute);


