var mongoose = require('mongoose');

var HospitalSchema = new mongoose.Schema({
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
},
locationLat:{
    type: Number
},
locationLong:{
    type: Number
},
contact:{
    type: Number,
    required: true,
},
email:{
    type: String,
    required: true,
    unique: true
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
},
departments:[{
    department:{
        departmentId:{
            type: String,
            required: true
        },
        name:{
            type: String,
            requred: true
        },
        time_created:{
            type: Date,
            default: Date.now
        }
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

module.exports = {Hospital};