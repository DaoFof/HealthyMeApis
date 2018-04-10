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