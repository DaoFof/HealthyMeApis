var {Doctor} = require('../models/doctor');
const {ObjectID} = require ('mongodb');
const _ = require('lodash');
var mongoose = require('mongoose');


module.exports = function(app) {

	app.post('/doctor',/*authenticate,*/ async (req, res) => {
        try{
          var doctor = new Doctor({
            name: req.body.name,
            city: req.body.city,
            country: req.body.country,
            contact: req.body.contact,
            email: req.body.email,
            department: req.body.department,
            medicalField: req.body.medicalField,
            studiedIn:  req.body.studiedIn
          });
      
          const doc = await doctor.save();
          res.send(doc);
        }catch(e){
          console.log(e);
          res.status(400).send(e);
        }
      });
      
      app.get('/doctor', /*authenticate,*/ async (req, res) => {
        try {
          const doctors = await Doctor.find({});
          res.send({doctors});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.get('/doctor/:id', /*authenticate,*/ async (req, res) => {
        try {
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          const doctor = await Doctor.findOne({
            _id : id 
          });
          if(!doctor){
            return res.status(404).send({doctor: 'Nothing found'});
          }
          res.send({doctor});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.delete('/doctor/:id',/*authenticate,*/  async (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send({url: id + '/Not found'});
          }
          const doctor = await Doctor.findOneAndRemove({
            _id:id,
            /*_creator: req.user._id*/
          });
          if(!doctor){
            return res.status(404).send();
          }
          res.send({doctor});
        }catch(e){
          res.status(400).send(e);
        }
      });
      
      app.patch('/doctor/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          var body = req.body;
          
        const doctor = await Doctor.findOneAndUpdate({_id : id/*, _creator: req.user._id*/},{$set : body}, {new : true});
          if(!doctor){
            return res.status(404).send();
          }
          res.send({doctor});
        }catch(e){
          res.status(400).send(e);
        }      
      });
      
};  