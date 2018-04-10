var mongoose = require('mongoose');

var Diagnose = mongoose.model('Diagnose', {
result:{
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
doctor:{
    type: String,
    required: false,
},
patient:{
    type: String,
    required: false,
},
/*symptoms:{

}*/
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    requiredd: true
}*/
});

module.exports = {Diagnose};