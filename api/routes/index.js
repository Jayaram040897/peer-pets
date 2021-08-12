const ctrlAuth = require('../controllers/authentication');
const ctrlEvents = require('../controllers/eventsController');
const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();
const VerifyToken = require('../config/verifyToken');
const events = require('../controllers/eventsController')

module.exports.secret = {
  'secret': 'pets'
};

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/userIdExist', ctrlAuth.userId);
router.post('/addPet', VerifyToken,events.addPets);
router.post('/petSearch', VerifyToken,events.getSearchValue);
router.get('/getPetList',VerifyToken,events.getPetsList);
router.get('/getMyPetList',VerifyToken,events.getMyPetList);
router.put('/updatePet',VerifyToken,events.updatePetStatus);

module.exports = router;
