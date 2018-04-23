var mongoose = require('mongoose');

var {HospitalSchema} = require('./hospital');

var HospitalManager = new mongoose.Schema({
job:{
    type: String,
    required: false,
},
hospital: HospitalSchema,
createdOn:{
    type: Date,
    default: Date.now
}
});

var Manager = mongoose.model('Manager', HospitalManager);

module.exports = {Manager, HospitalManager};