var {Hospital} = require('../models/hospital');
const {ObjectID} = require ('mongodb');
const _ = require('lodash');

var {authenticate} = require('../middleware/authenticate');

module.exports = function(app) {

    app.post('/hospital',authenticate, async (req, res) => {
      try{
        var hospital = new Hospital({
          name: req.body.name,
          city: req.body.city,
          country: req.body.country,
          lat: req.body.lat,
          lng: req.body.lng,
          contact: req.body.contact,
          email: req.body.email,
          departments: req.body.departmentControl,
          managerId: req.user._id
        });
        const doc = await hospital.save();
        res.send(doc);
      }catch(e){
        res.status(400).send(e);
      }
    });
    
      app.get('/hospital', /*authenticate,*/ async (req, res) => {
        try {
          var header = req.header('x-auth');
          console.log({header});
          const hospitals = await Hospital.find({});
          res.send({hospitals});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.get('/hospital/:id', authenticate, async (req, res) => {
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

      app.get('/managerHospital', authenticate, async(req, res)=>{
        try{
          var id = req.user._id;
          if (!ObjectID.isValid(id)) {
            return res.status(404).send();
          }
          const hospital = await Hospital.find({
            managerId: id
          });
          if (!hospital) {
            return res.status(404).send({ hospital: 'Nothing found' });
          }
          res.send({ hospital });
        }catch(e){
          res.status(400).send(e);
        }
      });

      app.delete('/hospital/:id',authenticate, async (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send({url: id + '/Not found'});
          }
          const hospital = await Hospital.findOneAndRemove({
            _id:id,
            managerId: req.user._id
          });
          if(!hospital){
            return res.status(404).send();
          }
          res.status(200).send({hospital});
        }catch(e){
          console.log(e);
          
          res.status(400).send(e);
        }
      });
      
      app.patch('/hospital/:id',authenticate, async  (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          var body = req.body;
          if(req.body.departmentControl){
            body.departments = req.body.departmentControl;
          }
        const hospital = await Hospital.findOneAndUpdate({_id : id, managerId: req.user._id},{$set : body}, {new : true});
          if(!hospital){
            return res.status(404).send();
          }
          res.send({hospital});
        }catch(e){
          res.status(400).send(e);
        }      
      });
      
};  