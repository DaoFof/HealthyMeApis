var mongoose = require('mongoose');

var Symptom = mongoose.model('Symptom', {
name:{
    type: String,
    required: true,
},
description:{
    type: String,
    required: false,
},
createdOn:{
    type: Date,
    required: true,
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Symptom};