var mongoose = require('mongoose');
var {Doctor} = require('./doctor');
var {Hospital} = require('./hospital');

var PatientSchema = new mongoose.Schema({
job:{
    type: String,
    required: false,
},
visitedDoctors:[{
    doctorId:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: false
    }
}]
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
  // params = patient.vistedDoctors
  async function retrieveDoctor(id){
    const doctor = await Doctor.findOne({
      _id : id 
    });    
    return doctor;
  };
PatientSchema.methods.retrieveHospital = async function (params){
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

PatientSchema.methods.retrieveDoctor = async function (params){
   var doctors = [];
   for (let doctor of params) {
       doctors.push(await retrieveDoctor(doctor.doctorId));
   }
   return doctors;
};
var Patient = mongoose.model('Patient', PatientSchema);

module.exports = {Patient, PatientSchema};