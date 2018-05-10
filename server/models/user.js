const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


var {PatientSchema} = require('./patient');
var {DoctorSchema} = require('./doctor');
var {HospitalManager} = require('./hospitalManager');

var UserSchema = new mongoose.Schema({
  lastName:{
    type: String,
    required: true
  },
  firstName:{
      type: String,
      required: true,
  },
  lat:{
    type: String,
    required: false
  },
  lng:{
    type: String,
    required: false
  },
  city:{
      type: String,
      required: false,
  },
  country:{
      type: String,
      required: false,
  },
  contact:{
      type: String,
      required: function(){
        return this.email == "" || this.email == undefined || this.email == null
      },
  },
  createdOn:{
      type: Date,
      required: true,
      default: Date.now
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  userType:{
      type: String,
      enum: ['Patient', 'Doctor', 'Hospital Manager'],
      required: true,
  },
  patient: PatientSchema,
  doctor: DoctorSchema,
  manager: HospitalManager,
  uniqueID:{
      type: String,
      required: false // on deployment should be true
  },
  wasNew:{
    type: Boolean,
    required: false
  },
  allow:{
    required: true,
    type: Boolean,
    default: function(){
      if(this.userType == 'Doctor'){
        return false;
      }
      return true;
    }
  }
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  var toSend = ['_id', 'email', 'lastName', 'lat', 'lng','firstName', 'userType'];
  if(user.userType == 'Hospital Manager'){
    var specialManagerAdd = ['manager.doctorRequest', 'manager.acceptedDoctor'];
    specialManagerAdd.forEach(element => {
      toSend.push(element);
    });
  }
  console.log(toSend);
  
  return _.pick(userObject,toSend);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;
  this.wasNew =  this.isNew;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.addHospitals = async function (hospitals){
  var user = this;
  var toPush = [];
  for (const hospital of hospitals) {
    hospital.hospitalId = hospital._id;
    delete hospital._id;
    toPush.push(hospital);
  }
  var update = {
    $push:{
      "doctor.hospitals":{
        $each: toPush
      }
    }
  }
  return await user.update(update);
}
UserSchema.methods.addDoctorRequest = async function (doctor, hospitalName){
  var user = this;
  var toPush = {
    "doctorId": doctor._id,
    "firstName": doctor.firstName,
    "lastName": doctor.lastName,
    "email": doctor.email,
    "hospitalName": hospitalName
  }
  var update = {
    $push:{
      "manager.doctorRequest": toPush
    }
  }
  return await user.update(update);
}
function findRequest(id, user) {
  for (const request of user.manager.doctorRequest) {
    if (request._id == id) {
      return request
    }
  }
}
UserSchema.methods.acceptDoctorRequest = async function(id){
  var user = this;
  var request = findRequest(id, user);
  var update = {
    $push:{
      "manager.acceptedDoctor": request
    },
    $pull:{
      "manager.doctorRequest": request
    }
  }
  var res = await user.update(update);
  return { res, "doctorId": request.doctorId}
}
UserSchema.methods.denyDoctorRequest = async function (id) {
  var user = this;
  var update = {
    $pull: {
      "manager.doctorRequest": findRequest(id, user)
    }
  }
  return await user.update(update);
}

var User = mongoose.model('User', UserSchema);

module.exports = {User}
