var mongoose = require('mongoose');

var Prescription = mongoose.model('Prescription', {
description:{
    type: String,
    require: false,
},
createdOn:{
    type: Date,
    require: true,
},
doctor:{
    type: String,
    require: false,
},
patient:{
    type: String,
    require: false,
},
/*symptoms:{

},
drugs:{
},*/
sickness:{
    type: String,
    require: false
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Prescription};