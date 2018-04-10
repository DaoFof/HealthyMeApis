var mongoose = require('mongoose');

var Hospital = mongoose.model('Hospital', {
name:{
    type: String,
    required: true,
    /*unique: true*/
},
city:{
    type: String,
    required: true,
},
country:{
    type: String,
    required: true,
},
locationLat:{
    type: Number
},
locationLong:{
    type: Number
},
contact:{
    type: Number,
    required: true,
},
email:{
    type: String,
    required: true,
    unique: true
},
createdOn:{
    type: Date,
    default: Date.now
},
createdBy:{
    type: String,
    /*require: true,*/
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

module.exports = {Hospital};