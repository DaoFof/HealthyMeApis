var mongoose = require('mongoose');

var Prescription = mongoose.model('Prescription', {
description:{
    type: String,
    required: false,
},
createdOn:{
    type: Date,
    required: true,
},
doctor:{
    type: String,
    required: false,
},
patient:{
    type: String,
    required: false,
},
/*symptoms:{

},
drugs:{
},*/
sickness:{
    type: String,
    required: false
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Prescription};