var mongoose = require('mongoose');

var Doctor = mongoose.model('Doctor', {
name:{
    type: String,
    require: true,
},
city:{
    type: String,
    require: true,
},
country:{
    type: String,
    require: true,
},
contact:{
    type: Number,
    require: true,
},
email:{
    type: Number,
    require: true,
},
medicalField:{
    type: String,
    require: true,
},
studiedIn:{
    type: String,
    /*require: true,*/
},
createdOn:{
    type: Date,
    require: true,
},
expertiseRate:{
    type: Number,
    /*require: true,*/
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Doctor};