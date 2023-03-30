const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  counterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
  }),
  counterModel = mongoose.model('counter', counterSchema);

counterSchema.index({ _id: 1, seq: 1 }, { unique: true });

const autoIncrementModelID = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(modelName, { $inc: { seq: 1 } }, { new: true, upsert: true },
    function (error, counter) {
      if (error) return next(error);
      doc.id = counter.seq;
      next();
    }
  );
}

module.exports = autoIncrementModelID;