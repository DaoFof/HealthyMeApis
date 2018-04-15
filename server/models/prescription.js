var mongoose = require('mongoose');

var Prescription = mongoose.model('Prescription', {
description:{
    type: String,
    required: false,
},
createdOn:{
    type: Date,
    default: Date.now,
},
doctor:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
},
patient:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
},
/*symptoms:{

},*/
drugs:[{
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
        required: false,
    },
    createdOn:{
        type: Date,
        default: Date.now
    },
    description:{
        type: String,
        required: false
    },
    dosage:{
        type: String,
        required: true
    }
}], // Children
/*sickness:{
    type: String,
    required: false
},*/
diagnoseId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
}
});

module.exports = {Prescription};