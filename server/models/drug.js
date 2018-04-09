var mongoose = require('mongoose');

var Drug = mongoose.model('Drug', {
name:{
    type: String,
    require: true,
},
brand:{
    type: String,
    require: false,
},
typeOfDrug:{
    type: String,
    require: true,
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

module.exports = {Drug};