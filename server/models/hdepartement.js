var mongoose = require('mongoose');

var Departement = mongoose.model('Departement', {
name:{
    type: String,
    required: true,
},
contact:{
    type: Number,
    required: false,
},
email:{
    type: Number,
    required: false,
},
createdOn:{
    type: Date,
    required: true,
},
createdBy:{
    type: String,
    required: false,
},
expertiseRate:{
    type: Number,
    required: false,
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Departement};