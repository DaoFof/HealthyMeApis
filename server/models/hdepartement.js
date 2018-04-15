var mongoose = require('mongoose');

var Departement = mongoose.model('Departement', {
name:{
    type: String,
    required: true,
    unique: true
},
contact:{
    type: String,
    required: false,
},
medicalField:{
    type: String,
    required: true
},
description:{
    type:String,
    required: true
},
created_on:{
    type: Date,
    default: Date.now
}
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Departement};