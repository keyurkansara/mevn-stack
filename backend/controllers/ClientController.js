const ClientsModel = require('../models/ClientModel')

exports.list = (req, res) => {
  ClientsModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
};

exports.create = (req, res) => {
  ClientsModel.create(req.body, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
      console.log('Client successfully created!');
    }
  });
};

exports.get = (req, res) => {
  ClientsModel.findOne({ id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
};

exports.update = (req, res) => {
  ClientsModel.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
      console.log('Client successfully updated!');
    }
  });
};

exports.delete = (req, res) => {
  ClientsModel.findOneAndRemove({ id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
};
