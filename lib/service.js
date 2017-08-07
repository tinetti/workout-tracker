const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;

const url = 'mongodb://localhost:27017/workout-tracker';
const conn = mongoose.createConnection(url);

//
// MODELS
//
const exerciseSchema = new Schema({
  name: {type: String, required: true},
  sets: [{type: Schema.Types.ObjectId, ref: 'Set'}],
});

const setSchema = new Schema({
  targetReps: Number,
  weight: Number,
  reps: Number,
  notes: String
});

const workoutSchema = new Schema({
  name: {type: String, required: true},
  exercises: [exerciseSchema],
});

const planSchema = new Schema({
  name: {type: String, required: true},
  workouts: [workoutSchema],
});
const Plan = conn.model('Plan', planSchema);

//
// PLAN OPERATIONS
//
module.exports.insertPlan = function (p) {
  const plan = new PlanModel();
  plan.name = p.name;
  return plan.save();
};

module.exports.updatePlan = function (id, plan) {
  return PlanModel.findByIdAndUpdate(id, plan).exec();
};

module.exports.deletePlan = function (id) {
  return PlanModel.deleteOne({_id: id}).exec();
};

module.exports.findPlans = function () {
  return PlanModel.find().exec();
};

module.exports.getPlan = function (id) {
  return PlanModel.findById(id).exec();
};


//
// EXERCISE OPERATIONS
//
module.exports.saveExerciseByName = function (exercise) {
  const query = {name: exercise.name};
  return ExerciseModel.findOneAndUpdate(query, exercise, {upsert: true}).exec().then(() => {
    return ExerciseModel.find(query).exec();
  });
};

module.exports.deleteExercise = function (id) {
  return ExerciseModel.deleteOne({_id: id}).exec();
};

module.exports.findExercises = function () {
  return ExerciseModel.find().exec();
};

module.exports.getExercise = function (id) {
  return ExerciseModel.findById(id).exec();
};
