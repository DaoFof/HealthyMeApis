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
            required: false
        },lastName: {
            type: String,
            required: false
        },
        firstName: {
            type: String,
            required: false,
        },
        email:{
            type: String,
            required: false
        },
        hospitalName:{
            type: String,
            required: false
        }
    }],
    acceptedDoctor:[{
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false
        }, lastName: {
            type: String,
            required: false
        },
        firstName: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false
        },
        hospitalName: {
            type: String,
            required: false
        }
    }]
});

var Manager = mongoose.model('Manager', HospitalManager);

module.exports = {Manager, HospitalManager};