var mongoose = require('mongoose');

var Drug = mongoose.model('Drug', {
name:{
    type: String,
    required: true,
},
brand:{
    type: String,
    required: false,
},
typeOfDrug:{
    type: String,
    required: true,
},
createdOn:{
    type: Date,
    required: true,
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Drug};