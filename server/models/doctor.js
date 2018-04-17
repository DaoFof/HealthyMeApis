var mongoose = require('mongoose');

var DoctorSchema = mongoose.Schema({
name:{
    type: String,
    required: true,
},
city:{
    type: String,
    required: true,
},
country:{
    type: String,
    required: true,
},
contact:{
    type: String,
    required: true,
},
email:{
    type: String,
    required: true,
},
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
createdOn:{
    type: Date,
    default: Date.now
},
expertiseRate:{
    type: Number,
    /*required: true,*/
    default: 0
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

var Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = {Doctor};