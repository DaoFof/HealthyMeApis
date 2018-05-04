var mongoose = require('mongoose');

var HospitalSchema = new mongoose.Schema({
managerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
},
name:{
    type: String,
    required: true,
    /*unique: true*/
},
city:{
    type: String,
    required: true,
},
country:{
    type: String,
    required: true,
},lat: {
    type: String,
    required: false
},
lng: {
    type: String,
    required: false
}, 
contact:{
    type: String,
    required:function() {
        return this.email == "" || this.email == undefined || this.email == null
    }
},
email:{
    type: String,
    required: false,
},
createdOn:{
    type: Date,
    default: Date.now
},
createdBy:{
    type: String,
    /*require: true,*/
},
expertiseRate:{
    type: Number,
    /*require: true,*/
    default: 0
},
departments:[{
    departmentId:{
        type: String,
        required: true
    },
    departmentName:{
        type: String,
        required: false // MAKE IT TRUE LATER
    },
    expertiseRate:{
        type: Number,
        default: 0
    }
}],
/*_creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
}*/
});

HospitalSchema.methods.addDepartment = async function (depart){
    var hospital = this;
    var update = {
        $push:{
            departments:{
                department:{
                    departmentId: depart.id,
                    name: depart.name
                }
            }
        }
    }
    return await hospital.update(update);
};
//Add Delete department method later

var Hospital =  mongoose.model('Hospital', HospitalSchema);

module.exports = {Hospital, HospitalSchema};