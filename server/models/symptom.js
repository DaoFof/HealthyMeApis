var mongoose = require('mongoose');

var Symptom = mongoose.model('Symptom', {
name:{
    type: String,
    require: true,
},
description:{
    type: String,
    require: false,
},
createdOn:{
    type: Date,
    require: true,
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Symptom};