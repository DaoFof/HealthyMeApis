require('./config/config');

const _ = require('lodash');

const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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


const port = process.env.PORT;

var hospitalRoutes =  require('./routes/hospitalroutes');
hospitalRoutes(app);

var doctorRoutes =  require('./routes/doctorroutes');
doctorRoutes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
  
  module.exports = {app};