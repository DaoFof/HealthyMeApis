var mongoose = require('mongoose');

var {HospitalSchema} = require('./hospital');

var HospitalManager = new mongoose.Schema({
    job:{
        type: String,
        required: false,
    }
});

var Manager = mongoose.model('Manager', HospitalManager);

module.exports = {Manager, HospitalManager};