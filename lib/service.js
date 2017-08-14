const mongoose = require('mongoose');

module.exports.init = function (config) {
  mongoose.Promise = require('bluebird');

  const Schema = mongoose.Schema;

  const url = config.mongo.url;
  const conn = mongoose.createConnection(url);

  //
  // MODELS
  //
  const workoutSchema = new Schema({
    name: {type: String, required: true},
    exercises: [{
      name: {type: String, required: true},
      sets: [{
        targetReps: Number,
        weight: Number,
        reps: Number,
        notes: String
      }]
    }]
  });
  const Workout = conn.model("Workout", workoutSchema);

  const planSchema = new Schema({
    name: {type: String, required: true},
    workouts: [workoutSchema],
  });
  const Plan = conn.model('Plan', planSchema);

  //
  // PLAN OPERATIONS
  //
  module.exports.insertPlan = function (p) {
    const plan = new PlanModel(p);
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
  // WORKOUT OPERATIONS
  //
  module.exports.insertWorkout = function (workout) {
    const w = new Workout(workout);
    return w.save();
  };

  module.exports.updateWorkout = function (workout) {
    const _id = workout._id;
    return Workout.findByIdAndUpdate(_id, workout).exec().then(() => {
      return Workout.findById(_id).exec();
    });
  };

  module.exports.deleteWorkoutById = function (id) {
    return Workout.deleteOne({_id: id}).exec();
  };

  module.exports.findWorkouts = function (conditions) {
    return Workout.find(conditions).exec();
  };

  module.exports.findWorkoutById = function (id) {
    return Workout.findById(id).exec();
  };

  module.exports.deleteAllWorkouts = function () {
    return Workout.deleteMany().exec();
  };

};