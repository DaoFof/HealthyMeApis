var mongoose = require('mongoose');

var Disease = mongoose.model('Disease', {
name:{
    type: String,
    required: true,
},
type:{
    type: String,
    required: false,
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
    requiredd: true
}*/
});

module.exports = {Disease};