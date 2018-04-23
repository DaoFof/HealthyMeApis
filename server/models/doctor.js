var mongoose = require('mongoose');

var DoctorSchema = mongoose.Schema({
medicalField/*Departement*/:{
    type: String,
    required: true,
},
department:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
},
studiedIn:{
    type: String,
    /*required: true,*/
},
expertiseRate:{
    type: Number,
    /*required: true,*/
    default: 0
}
});

var Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = {Doctor, DoctorSchema};