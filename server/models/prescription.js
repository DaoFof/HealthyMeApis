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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
},
patient:{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
},
/*symptoms:{

},
drugs:{
}, // Children
sickness:{
    type: String,
    required: false
},*/
diagnoseId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
}
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Prescription};