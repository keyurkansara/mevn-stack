const ProvidersModel = require('../models/ProviderModel')

exports.list = (req, res) => {
  ProvidersModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
};

exports.create = (req, res) => {
  ProvidersModel.create(req.body, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
      console.log('Provider successfully created!');
    }
  });
};

exports.get = (req, res) => {
  ProvidersModel.findOne({ id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
};

exports.update = (req, res) => {
  ProvidersModel.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
      console.log('Provider successfully updated!');
    }
  });
};

exports.delete = (req, res) => {
  ProvidersModel.findOneAndRemove({ id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
};
