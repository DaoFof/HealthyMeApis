var {Diagnose} = require('../models/diagnose');
const {ObjectID} = require ('mongodb');
const _ = require('lodash');

module.exports = function(app) {

	app.post('/diagnose',/*authenticate,*/ async (req, res) => {
        try{
          var diagnose = new Diagnose({
            result: req.body.result,
            description: req.body.description || "",
            doctor: req.body.doctor,
            patient: req.body.patient,
            symptoms:  req.body.symptoms
          });
      
          const doc = await diagnose.save();
          res.send(doc);
        }catch(e){
          console.log(e);
          res.status(400).send(e);
        }
      });
      
      app.get('/diagnose', /*authenticate,*/ async (req, res) => {
        try {
          const diagnoses = await Diagnose.find({});
          res.send({diagnoses});
        } catch (e) {
          res.status(400).send(e);
        }
      });



      app.get('/diagnose/:id', /*authenticate,*/ async (req, res) => {
        try {
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          const diagnose = await Diagnose.findOne({
            _id : id 
          });
          if(!diagnose){
            return res.status(404).send({diagnose: 'Nothing found'});
          }
          res.send({diagnose});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.get('/diagnosedoctor/:doctorid', /*authenticate,*/ async (req, res) => {
        try {
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          const diagnose = await Diagnose.findOne({
            doctor : doctorid 
          });
          if(!diagnose){
            return res.status(404).send({diagnose: 'Nothing found'});
          }
          res.send({diagnose});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.get('/diagnosepatient/:patientid', /*authenticate,*/ async (req, res) => {
        try {
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          const diagnose = await Diagnose.findOne({
            patient : patientid
          });
          if(!diagnose){
            return res.status(404).send({diagnose: 'Nothing found'});
          }
          res.send({diagnose});
        } catch (e) {
          res.status(400).send(e);
        }
      });
      
      
      
      app.delete('/diagnose/:id',/*authenticate,*/  async (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send({url: id + '/Not found'});
          }
          const diagnose = await Diagnose.findOneAndRemove({
            _id:id,
            /*_creator: req.user._id*/
          });
          if(!diagnose){
            return res.status(404).send();
          }
          res.send({diagnose});
        }catch(e){
          res.status(400).send(e);
        }
      });
      


      app.patch('/diagnose/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          var body = req.body;
          
        const diagnose = await Diagnose.findOneAndUpdate({_id : id/*, _creator: req.user._id*/},{$set : body}, {new : true});
          if(!diagnose){
            return res.status(404).send();
          }
          res.send({diagnose});
        }catch(e){
          res.status(400).send(e);
        }      
      });


      // symptoms
      app.patch('/adddiagnosesymptom/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
         
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }

          const diagnose = await Diagnose.findOneAndUpdate(
            {_id : id/*, _creator: req.user._id*/},
            {$push : {symptoms: req.body.symptom}},
            {new : true}
          );
          if(!diagnose){
            return res.status(404).send();
          }
          res.send({diagnose});
        }catch(e){
          res.status(400).send(e);
        }      
      });

      app.patch('/removediagnosesymptom/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
         
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }

          const diagnose = await Diagnose.findOneAndUpdate(
            {_id : id/*, _creator: req.user._id*/},
            {$pull : {symptoms: req.body.symptom}},
            {new : true}
          );
          if(!diagnose){
            return res.status(404).send();
          }
          res.send({diagnose});
        }catch(e){
          res.status(400).send(e);
        }      
      });



      //NOT TESTED

      app.patch('/diagnosesymptom/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
         
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          var option= {}, pullItems = [], pushItems = [];
          var body = req.body.symptoms;
          body.forEach(symptom => {
            if(symptom.type == "pull"){
              pullItems.push(symptom);
            }
            if(symptom.type == "push"){
              pushItems.push(symptom);
            }
          });

          option.$pull = {symptoms: {$in: pullItems}};
          option.$push = {symptoms: {$each: pushItems}};

          const diagnose = await Diagnose.findOneAndUpdate(
            {_id : id/*, _creator: req.user._id*/},
            option,
            {new : true}
          );
          if(!diagnose){
            return res.status(404).send();
          }
          res.send({diagnose});
        }catch(e){
          res.status(400).send(e);
        }      
      });

};  