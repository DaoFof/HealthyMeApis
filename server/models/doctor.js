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
    type: Number,
    required: true,
},
email:{
    type: Number,
    required: true,
},
medicalField:{
    type: String,
    required: true,
},
studiedIn:{
    type: String,
    /*required: true,*/
},
createdOn:{
    type: Date,
    required: true,
},
expertiseRate:{
    type: Number,
    /*required: true,*/
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Doctor};