var mongoose = require('mongoose');

var Doctor = mongoose.model('Doctor', {
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
departement:{
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

module.exports = {Doctor};