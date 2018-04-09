var mongoose = require('mongoose');

var Appointement = mongoose.model('Appointement', {
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
status:{
    type: String,
    require: false
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Appointement};