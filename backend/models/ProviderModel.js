const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrementModelID = require('./counterModel');

let providersSchema = new Schema({
  id: { type: Number, unique: true, min: 1 },
  name: { type: String },
  client: { type: Schema.Types.ObjectId, ref: "Clients" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
}, { collection: 'providers' });

providersSchema.pre('save', function (next) {
  if (!this.isNew) { next(); return; }
  autoIncrementModelID('providers', this, next);
});

module.exports = mongoose.model('Providers', providersSchema);
