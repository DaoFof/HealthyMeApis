var mongoose = require('mongoose');

var Departement = mongoose.model('Departement', {
name:{
    type: String,
    require: true,
},
contact:{
    type: Number,
    require: false,
},
email:{
    type: Number,
    require: false,
},
createdOn:{
    type: Date,
    require: true,
},
createdBy:{
    type: String,
    require: false,
},
expertiseRate:{
    type: Number,
    require: false,
},
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

module.exports = {Departement};