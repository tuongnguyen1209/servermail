const typeScore = require("../models/typeScoreModel");
const Factory = require("../utils/ApiFactory");

exports.getAll = Factory.getAll(typeScore);

exports.getOne = Factory.getOne(typeScore);

exports.create = Factory.createOne(typeScore);

exports.edit = Factory.updateOne(typeScore);

exports.delete = Factory.deleteOne(typeScore);
