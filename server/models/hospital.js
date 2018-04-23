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
    type: String,
    required: true,
},
email:{
    type: String,
    required: true,
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
    createdOn:{
        type: Date,
        required: false,
    },
    createdBy:{
        type: String,
        required: false,
    },
    contact:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    time_created:{
        type: Date,
        default: Date.now
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