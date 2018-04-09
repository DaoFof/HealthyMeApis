var mongoose = require('mongoose');

var Hospital = mongoose.model('Hospital', {
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
locationLat:{
    type: Number
},
locationLong:{
    type: Number
},
contact:{
    type: Number,
    require: true,
},
email:{
    type: String,
    require: true,
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