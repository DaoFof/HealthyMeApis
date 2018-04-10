var {Hospital} = require('../models/hospital');
const {ObjectID} = require ('mongodb');
const _ = require('lodash');

module.exports = function(app) {

	app.post('/hospital',/*authenticate,*/ async (req, res) => {
        try{
          var hospital = new Hospital({
            name: req.body.name,
            city: req.body.city,
            country: req.body.country,
            locationLat: req.body.locationLat,
            locationLong: req.body.locationLong,
            contact: req.body.contact,
            email: req.body.email
          });
      
          const doc = await hospital.save();
          res.send(doc);
        }catch(e){
            console.log(e);
          res.status(400).send(e);
        }
      });
      
      app.get('/hospital', /*authenticate,*/ async (req, res) => {
        try {
          const hospitals = await Hospital.find({});
          res.send({hospitals});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.get('/hospital/:id', /*authenticate,*/ async (req, res) => {
        try {
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          const hospital = await Hospital.findOne({
            _id : id 
          });
          if(!hospital){
            return res.status(404).send({hospital: 'Nothing found'});
          }
          res.send({hospital});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.delete('/hospital/:id',/*authenticate,*/  async (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send({url: id + '/Not found'});
          }
          const hospital = await Hospital.findOneAndRemove({
            _id:id,
            /*_creator: req.user._id*/
          });
          if(!hospital){
            return res.status(404).send();
          }
          res.send({hospital});
        }catch(e){
          res.status(400).send(e);
        }
      });
      
      app.patch('/hospital/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          var body = req.body;
          console.log(body);
          
        const hospital = await Hospital.findOneAndUpdate({_id : id/*, _creator: req.user._id*/},{$set : body}, {new : true});
          if(!hospital){
            return res.status(404).send();
          }
          res.send({hospital});
        }catch(e){
          res.status(400).send(e);
        }      
      });
      
};  