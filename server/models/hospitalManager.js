var mongoose = require('mongoose');

var {HospitalSchema} = require('./hospital');

var HospitalManager = new mongoose.Schema({
    job:{
        type: String,
        required: false,
    },
    doctorRequest:[{
        doctorId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },lastName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: false
        }
    }]
});

var Manager = mongoose.model('Manager', HospitalManager);

module.exports = {Manager, HospitalManager};