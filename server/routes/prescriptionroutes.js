var {Prescription} = require('../models/prescription');
const {ObjectID} = require ('mongodb');
const _ = require('lodash');

module.exports = function(app) {

	app.post('/prescription',/*authenticate,*/ async (req, res) => {
        try{
          var prescription = new Prescription({
            diagnoseId: req.body.diagnoseId,
            description: req.body.description || "",
            doctor: req.body.doctor,
            patient: req.body.patient,
            drugs:  req.body.drugs
          });
      
          const doc = await prescription.save();
          res.send(doc);
        }catch(e){
          console.log(e);
          res.status(400).send(e);
        }
      });
      
      app.get('/prescription', /*authenticate,*/ async (req, res) => {
        try {
          const prescriptions = await Prescription.find({});
          res.send({prescriptions});
        } catch (e) {
          res.status(400).send(e);
        }
      });



      app.get('/prescription/:id', /*authenticate,*/ async (req, res) => {
        try {
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          const prescription = await Prescription.findOne({
            _id : id 
          });
          if(!prescription){
            return res.status(404).send({prescription: 'Nothing found'});
          }
          res.send({prescription});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.get('/prescriptiondoctor/:doctorid', /*authenticate,*/ async (req, res) => {
        try {
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          const prescription = await Prescription.findOne({
            doctor : doctorid 
          });
          if(!prescription){
            return res.status(404).send({prescription: 'Nothing found'});
          }
          res.send({prescription});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.get('/prescriptionpatient/:patientid', /*authenticate,*/ async (req, res) => {
        try {
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          const prescription = await Prescription.findOne({
            patient : patientid
          });
          if(!prescription){
            return res.status(404).send({prescription: 'Nothing found'});
          }
          res.send({prescription});
        } catch (e) {
          res.status(400).send(e);
        }
      });
      
      
      
      app.delete('/prescription/:id',/*authenticate,*/  async (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send({url: id + '/Not found'});
          }
          const prescription = await Prescription.findOneAndRemove({
            _id:id,
            /*_creator: req.user._id*/
          });
          if(!prescription){
            return res.status(404).send();
          }
          res.send({prescription});
        }catch(e){
          res.status(400).send(e);
        }
      });
      


      app.patch('/prescription/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          var body = req.body;
          
        const prescription = await Prescription.findOneAndUpdate({_id : id/*, _creator: req.user._id*/},{$set : body}, {new : true});
          if(!prescription){
            return res.status(404).send();
          }
          res.send({prescription});
        }catch(e){
          res.status(400).send(e);
        }      
      });


      // Drugs
      app.patch('/addprescriptiondrug/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
         
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }

          const prescription = await Prescription.findOneAndUpdate(
            {_id : id/*, _creator: req.user._id*/},
            {$push : {drugs: req.body.drug}},
            {new : true}
          );
          if(!prescription){
            return res.status(404).send();
          }
          res.send({prescription});
        }catch(e){
          res.status(400).send(e);
        }      
      });

      app.patch('/removeprescriptiondrug/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
         
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }

          const prescription = await Prescription.findOneAndUpdate(
            {_id : id/*, _creator: req.user._id*/},
            {$pull : {drugs: req.body.drug}},
            {new : true}
          );
          if(!prescription){
            return res.status(404).send();
          }
          res.send({prescription});
        }catch(e){
          res.status(400).send(e);
        }      
      });



      //NOT TESTED

      app.patch('/prescriptiondrug/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
         
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          var option= {}, pullItems = [], pushItems = [];
          var body = req.body.drugs;
          body.forEach(drug => {
            if(drug.type == "pull"){
              pullItems.push(drug);
            }
            if(drug.type == "push"){
              pushItems.push(drug);
            }
          });

          option.$pull = {drugs: {$in: pullItems}};
          option.$push = {drugs: {$each: pushItems}};

          const prescription = await Prescription.findOneAndUpdate(
            {_id : id/*, _creator: req.user._id*/},
            option,
            {new : true}
          );
          if(!prescription){
            return res.status(404).send();
          }
          res.send({prescription});
        }catch(e){
          res.status(400).send(e);
        }      
      });

};  