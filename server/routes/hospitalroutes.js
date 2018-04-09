var {Hospital} = require('../models/hospital');
module.exports = function(app) {

	app.post('/hospitals',/*authenticate,*/ async (req, res) => {
        try{
            console.log("request");
            
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
      
      app.get('/todos', /*authenticate,*/ async (req, res) => {
        try {
          const todos = await Todo.find({
            _creator: req.user._id
          });
          res.send({todos});
      
        } catch (e) {
          res.status(400).send(e);
        }
      });
      
};  