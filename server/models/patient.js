var mongoose = require('mongoose');
var {Doctor} = require('./doctor');
var {Hospital} = require('./hospital');

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
    doctorId:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: false
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
PatientSchema.methods.retrieveHospital = async function (params){
     // params = patient.vistedDoctors
    async function retrieveDoctor(id){
        const doctor = await Doctor.findOne({
          _id : id 
        });
        return doctor;
      };
      async function retrieveHospital(departmentId){
        const hospital = await Hospital.findOne({
          'departments._id' : departmentId 
        });
        return hospital;
      };
    var doctors = [], hospitals = [];
    for (let doctor of params) {
        doctors.push(await retrieveDoctor(doctor.doctorId));
    }
    for (let doctor of doctors){
        hospitals.push(await retrieveHospital(doctor.department));
    }
    return hospitals;
};
var Patient = mongoose.model('Patient', PatientSchema);

module.exports = {Patient};