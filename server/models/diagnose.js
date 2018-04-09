var mongoose = require('mongoose');

var Diagnose = mongoose.model('Diagnose', {
result:{
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
doctor:{
    type: String,
    require: false,
},
patient:{
    type: String,
    require: false,
},
/*symptoms:{

}*/
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Diagnose};