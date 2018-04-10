var mongoose = require('mongoose');

var Patient = mongoose.model('Patient', {
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
Job:{
    type: String,
    required: false,
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

module.exports = {Patient};