var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
name:{
    type: String,
    required: true,
    unique: true
},
city:{
    type: String,
    required: true,
},
country:{
    type: String,
    required: true,
},
contact:{
    type: String,
    required: true,
},
email:{
    type: String,
    required: true,
},
job:{
    type: String,
    required: false,
},
createdOn:{
    type: Date,
    required: true,
    default: Date.now
},
vistedDoctors:[{
    doctor:{
        doctorId:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: false
        }
    }
}],
uniqueID:{
    type: String,
    required: false // on deployment should be true
}
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

PatientSchema.methods.addDoctor = async function (params) {
    var patient = this;
    var update = {
        $push:{
            vistedDoctors:{
                doctor:{
                    doctorId: params.id,
                    name: params.name || ""
                }
            }
        }
    }
    return await patient.update(update);
}

var Patient = mongoose.model('Patient', PatientSchema);

module.exports = {Patient};