const mongoose = require('mongoose');

const myPetsSchema = new mongoose.Schema({
    
    name: { type: String},
    age: { type: Number },
    place:{type: String},
    boughtBy:{type: String}
  },
    { timestamps: { createdAt: 'created_at', updateAt: 'updated_at' } }
  );

mongoose.model('MyPets', myPetsSchema);
