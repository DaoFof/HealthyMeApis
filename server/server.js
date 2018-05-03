require('./config/config');

const _ = require('lodash');

const express = require('express');
var app = express();
var multer = require('multer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};
app.use(cors(corsOptions));


//multer storage setup
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads/')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    console.log(req.user._id);
    
    cb(null, req.user._id + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});
var upload = multer({ //multer settings
  storage: storage
}).single('file');

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
var {User} = require('./models/user');

const port = process.env.PORT;
//ENABLE CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers", "x-auth");
  next();
});

var hospitalRoutes =  require('./routes/hospitalroutes');
hospitalRoutes(app);

const doctorRoutes =  require('./routes/doctorroutes'), 
    departementRoutes =  require('./routes/hdepartementroutes');
    patientRoutes =  require('./routes/patientroutes'),
    diagnoseRoutes =  require('./routes/diagnoseroutes'),
    prescriptionRoutes =  require('./routes/prescriptionroutes'),
    userRoute =  require('./routes/userroute');

  userRoute(app, upload);
  doctorRoutes(app);
  departementRoutes(app);
  patientRoutes(app);
  diagnoseRoutes(app);
  prescriptionRoutes(app);



app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
  
  module.exports = {app};