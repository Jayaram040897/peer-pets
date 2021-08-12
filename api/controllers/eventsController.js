const mongoose = require('mongoose');
const Event = mongoose.model('Events');
const MyPet = mongoose.model('MyPets');
const ObjectId = require('mongodb').ObjectID;

module.exports.addPets = (req, res) => {
  let events = new Event({
    name: req.body.name,
    place: req.body.place,
    age : req.body.age,
    status : 0
  });
  events.save((err, data) => {
    if (err) {
      res.send({ message: JSON.stringify(err) })
    } else {
      res.status(200);
      res.send({
        message: "Pet Added Successfully !!",
        data: data,
        success: true
      });
    }
  });
};

module.exports.getPetsList = (req, res) => {

  Event.find().exec(function (err, petData) {
    res.status(200).send(petData);
  });
};

module.exports.getMyPetList = (req, res) => {

  MyPet.find({boughtBy:req._id}).exec(function (err, petData) {
    res.status(200).send(petData);
  });
};
module.exports.getSearchValue = (req, res) => {

  const searchValue = req.body.searchValue

  Event.find({ "$or": [{ "name": { '$regex': searchValue, '$options': 'i' } },
  { "place": { '$regex': searchValue, '$options': 'i' } }]}).exec(function (err, searchResult) {
    res.status(200).send(searchResult);
  });
}


module.exports.updatePetStatus = (req, res) => {
  let petId = req.body._id

  Event.update({_id:ObjectId(petId)},{$set:{'status':1}},(err, data) => {
    if (err) {
      res.send({ message: JSON.stringify(err) })
    } else {
      let myPet = new MyPet({
        name: req.body.name,
        place: req.body.place,
        age : req.body.age,
        boughtBy: req._id
      });
      myPet.save((err, dataValue) => {
        if (err) {
          res.send({ message: JSON.stringify(err) })
        } else {
          res.status(200);
          res.send({
            message: "Pet Updated Successfully !!",
            data: data,
            success: true
          });
        }
      })

    }
  })
};
