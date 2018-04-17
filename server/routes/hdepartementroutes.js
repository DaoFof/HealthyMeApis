var {Departement} = require('../models/hdepartement');
const {ObjectID} = require ('mongodb');
const _ = require('lodash');

module.exports = function(app) {

	app.post('/departement',/*authenticate,*/ async (req, res) => {
        try{
          var departement = new Departement({
            name: req.body.name,
            contact: req.body.contact,
            description:  req.body.description
          });
      
          const doc = await departement.save();
          res.send(doc);
        }catch(e){
          console.log(e);
          res.status(400).send(e);
        }
      });
      
      app.get('/departement', /*authenticate,*/ async (req, res) => {
        try {
          const departements = await Departement.find({});
          res.send({departements});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.get('/departement/:id', /*authenticate,*/ async (req, res) => {
        try {
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          const departement = await Departement.findOne({
            _id : id 
          });
          if(!departement){
            return res.status(404).send({departement: 'Nothing found'});
          }
          res.send({departement});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.delete('/departement/:id',/*authenticate,*/  async (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send({url: id + '/Not found'});
          }
          const departement = await Departement.findOneAndRemove({
            _id:id,
            /*_creator: req.user._id*/
          });
          if(!departement){
            return res.status(404).send();
          }
          res.send({departement});
        }catch(e){
          res.status(400).send(e);
        }
      });
      
      app.patch('/departement/:id',/*authenticate,*/ async  (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          var body = req.body;
          
        const departement = await Departement.findOneAndUpdate({_id : id/*, _creator: req.user._id*/},{$set : body}, {new : true});
          if(!departement){
            return res.status(404).send();
          }
          res.send({departement});
        }catch(e){
          res.status(400).send(e);
        }      
      });
      
};  