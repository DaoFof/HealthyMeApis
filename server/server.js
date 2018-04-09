require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Diagnose} = require('./models/diagnose');
var {Disease} = require('./models/disease');
var {Doctor} = require('./models/doctor');
var {Drug} = require('./models/drug');
var {Appointement} = require('./models/happointement');
var {Departement} = require('./models/hdepartement');
var {Hospital} = require('./models/hospital');
var {Patient} = require('./models/patient');
var {Prescription} = require('./models/prescription');
var {Symptom} =  require('./models/symptom');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());




app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
  
  module.exports = {app};