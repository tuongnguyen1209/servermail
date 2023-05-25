const pointPattern = require("../models/pointPatternModel");
const Factory = require("../utils/ApiFactory");

exports.getAll = Factory.getAll(pointPattern);

exports.getOne = Factory.getOne(pointPattern);

exports.create = Factory.createOne(pointPattern);

exports.edit = Factory.updateOne(pointPattern);

exports.delete = Factory.deleteOne(pointPattern);
