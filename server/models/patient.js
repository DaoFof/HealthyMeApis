var mongoose = require('mongoose');

var Patient = mongoose.model('Patient', {
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
Job:{
    type: String,
    require: false,
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

module.exports = {Patient};