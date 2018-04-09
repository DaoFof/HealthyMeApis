var mongoose = require('mongoose');

var Disease = mongoose.model('Disease', {
name:{
    type: String,
    require: true,
},
type:{
    type: String,
    require: false,
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

module.exports = {Disease};