const db = require("../models");

// Defining methods for the restaurantsController
module.exports = {
  findAll: function (req, res) {
    db.Restaurant.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Restaurant.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(404).json(err));
  },
  create: function (req, res) {
    // console.log("req.body in create:", req.body);
    db.Restaurant.create(req.body)
      .then((dbModel) => res.status(201).json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Restaurant.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // remove: function (req, res) {
  //   db.Restaurant.findById({ _id: req.params.id })
  //     .then((dbModel) => dbModel.remove())
  //     .then((dbModel) => res.json(dbModel))
  //     .catch((err) => res.status(422).json(err));
  // },
  remove: function (req, res) {
    db.Restaurant.findByIdAndRemove({ _id: req.params.id })
      .then(() => res.json({ success: true }))
      .catch((err) => res.status(422).json(err));
  },
};
