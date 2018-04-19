var {Patient} = require('../models/patient');
const {ObjectID} = require ('mongodb');
const _ = require('lodash');

module.exports = function(app) {

	app.post('/patient',/*authenticate,*/ async (req, res) => {
        try{
          var patient = new Patient({
            name: req.body.name,
            city: req.body.city,
            country: req.body.country,
            contact: req.body.contact,
            email: req.body.email,
            job: req.body.job,
            uniqueID: req.body.id || "",
            vistedDoctors: req.body.vistedDoctors
          });
      
          const doc = await patient.save();
          res.send(doc);
        }catch(e){
          console.log(e);
          res.status(400).send(e);
        }
      });
      
      app.get('/patient', /*authenticate,*/ async (req, res) => {
        try {
          const patients = await Patient.find({});
          res.send({patients});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.get('/patient/:id', /*authenticate,*/ async (req, res) => {
        try {
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          const patient = await Patient.findOne({
            _id : id 
          });
          if(!patient){
            return res.status(404).send({patient: 'Nothing found'});
          }
          res.send({patient});
        } catch (e) {
          res.status(400).send(e);
        }
      });


      app.get('/patientHospital/:id', /*authenticate,*/ async (req, res) => {
        try {
          function removeDuplicates( arr, prop ) {
            let obj = {};
            return Object.keys(arr.reduce((prev, next) => {
              if(!obj[next[prop]]) obj[next[prop]] = next; 
              return obj;
            }, obj)).map((i) => obj[i]);
          }
          
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          var patient = await Patient.findOne({
            _id : id 
          });
          if(!patient){
            return res.status(404).send({patient: 'Nothing found'});
          }

          hospitals = removeDuplicates(await patient.retrieveHospital(patient.vistedDoctors),"_id");
          res.send({hospitals});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.delete('/patient/:id',/*authenticate,*/  async (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send({url: id + '/Not found'});
          }
          const patient = await Patient.findOneAndRemove({
            _id:id,
            /*_creator: req.user._id*/
          });
          if(!patient){
            return res.status(404).send();
          }
          res.send({patient});
        }catch(e){
          res.status(400).send(e);
        }
      });
      
      app.patch('/patient/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          var body = req.body;
          
        const patient = await Patient.findOneAndUpdate({_id : id/*, _creator: req.user._id*/},{$set : body}, {new : true});
          if(!patient){
            return res.status(404).send();
          }
          res.send({patient});
        }catch(e){
          res.status(400).send(e);
        }      
      });
      
};  