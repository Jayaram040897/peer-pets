const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    
    name: { type: String , require: true },
    age: { type: Number },
    place:{type: String , require: true},
    status: { type: Number }
  },
    { timestamps: { createdAt: 'created_at', updateAt: 'updated_at' } }
  );

mongoose.model('Events', eventsSchema);
