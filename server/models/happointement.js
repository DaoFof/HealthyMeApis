var mongoose = require('mongoose');

var Appointement = mongoose.model('Appointement', {
description:{
    type: String,
    required: false,
},
createdOn:{
    type: Date,
    required: true,
},
departement:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
},
doctor:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
},
patient:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
},
/*symptoms:{

},
drugs:{
},*/
status:{
    type: String,
    required: false
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Appointement};