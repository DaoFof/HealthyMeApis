const _ = require('lodash');
const mongoose = require('mongoose');
const {ObjectID} = require ('mongodb');
var {User} = require('../models/user');

var {authenticate} = require('../middleware/authenticate');

module.exports = function(app, upload){
    // POST /users
app.post('/users', async (req, res) => {
    try{
      const body = _.pick(req.body, 
        ['email', 'password', 'city', 'country','contact', 'userType']
      );
      body.firstName = req.body.name.firstName,
      body.lastName = req.body.name.lastName;
      
      const user = new User(body);
      await user.save();
      const token = await user.generateAuthToken();
      res.header('x-auth', token).status(200).send(user);
    }catch(e){
      console.log(e);
      
      res.status(400).send(e);
    }
  });
  
  // GET ALL
  app.get('/users', /*authenticate,*/ async (req, res)=>{
    try {
      const users = await User.find({});
      res.send({users});
    } catch (e) {
      res.status(400).send(e);
    }
  });
 async function getElement(userType, res){
    try {
      const users = await User.find({userType});
      res.send({users});
    } catch (e) {
      res.status(400).send(e);
    }
  }
  //GET BY TYPE 
  app.get('/patient',/*authenticate,*/ (req, res)=>{
    getElement("Patient", res);
  });
  app.get('/doctor',/*authenticate,*/async (req, res)=>{
   getElement("Doctor", res);
  });
  app.get('/manager', authenticate, async (req, res)=>{
    getElement("Manager", res);
  });

  app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
  });
  // GET BY OPTION GIVEN
  
  function clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }
  }
  app.post('/byoption', authenticate, async (req, res)=>{
    try{
      const body = _.pick(req.body, 
        ['email', 'lastName', 'firstName', 'city', 'country','contact', 'userType']
      );
      clean(body);
     const users = await User.find(body);
      res.send({users});
    }catch(e){
      res.status(400).send(e);
    }
  });
  
  app.post('/users/login', async (req, res) => {
    try{
      const body = _.pick(req.body, ['email', 'password']);
      const user = await User.findByCredentials(body.email, body.password);
      const token = await user.generateAuthToken();      
      res.header('x-auth', token).send(user);
    }catch(e){
      res.status(400).send();
    }
  });
  
  app.delete('/users/me/token', authenticate, async (req, res) => {
    try{
      await req.user.removeToken(req.token);
      res.status(200).send();
    }catch(e){
      res.status(400).send();
    }
  });  


  app.patch('/user',authenticate, async  (req, res)=>{
    try{
      var body = req.body;
      var id =  req.user._id;
      const user = await User.findOneAndUpdate({_id : id},{$set : body}, {new : true});
      if(!user){
        return res.status(404).send();
      }
      res.send({user});
    }catch(e){
      console.log(e);
      res.status(400).send(e);
    }      
  });

  app.patch('/addDoctorHospital', authenticate, async (req, res) => {
    try {
      if(req.user.userType != 'Doctor'){
        return res.status(401).send({'userType': 'Different to doctor'});
      }
      var updateInfo = await req.user.addHospitals(req.body);
      if (!updateInfo) {
        return res.status(404).send();
      }
      for (const hospital of req.body) {
        let manager = await User.findById(hospital.managerId);
        let result = await manager.addDoctorRequest(req.user);
      }
      res.status(200).send({ updateInfo });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });

// user picture upload route
  app.post('/uploadFile', authenticate, async (req, res)=>{
    upload(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        res.status(502).send({err})
      }
      res.status(200).send({'user': req.user})

      // Everything went fine
    })
  });
}