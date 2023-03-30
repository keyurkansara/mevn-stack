const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrementModelID = require('./counterModel');

let clientsSchema = new Schema({
  id: { type: Number, unique: true, min: 1 },
  name: { type: String },
  email: { type: String },
  phone: { type: Number },
  providers: { type: Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
}, { collection: 'clients' });

clientsSchema.pre('save', function (next) {
  if (!this.isNew) { next(); return; }
  autoIncrementModelID('clients', this, next);
});

module.exports = mongoose.model('Clients', clientsSchema);
