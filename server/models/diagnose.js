var mongoose = require('mongoose');

var Diagnose = mongoose.model('Diagnose', {
result:{
    type: String,
    required: true,
},
description:{
    type: String,
    required: false,
},
createdOn:{
    type: Date,
    default: Date.now
},
doctor:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
},
patient:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
},
symptoms:[{
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    date:{
        type: Date,
        default: Date.now
    }
}],
/*symptoms:{

}*/
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    requiredd: true
}*/
});

module.exports = {Diagnose};