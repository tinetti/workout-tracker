const mongoose = require('mongoose');

module.exports.init = function (config) {
  mongoose.Promise = require('bluebird');

  const Schema = mongoose.Schema;

  const url = config.mongo.url;
  const conn = {
    model: function (name, schema) {
      return null;
    }
  };

  //
  // MODELS
  //
  const workoutSchema = new Schema({
    name: {type: String, required: true},
    exerciseGroups: [new Schema({
      name: String,
      exercises: [new Schema({
        name: String,
        sets: [new Schema({
          targetReps: Number,
          targetSeconds: Number,
          weight: Number,
          reps: Number,
          notes: String
        }, {_id: false})]
      }, {_id: false})]
    }, {_id: false})]
  });
  const planSchema = new Schema({
    name: {type: String, required: true},
    workoutGroups: [new Schema({
      name: String,
      workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout'
      }]
    }, {_id: false})]
  });

  //
  // OPERATIONS
  //
  const insertFunc = function (model) {
    return function (value) {
      return new model(value).save();
    };
  };
  const updateByIdFunc = function (model) {
    return function (id, value) {
      return model.findByIdAndUpdate(id, value).exec().then(() => {
        return model.findById(id).exec();
      });
    };
  };
  const deleteByIdFunc = function (model) {
    return function (id) {
      return model.deleteOne({_id: id}).exec();
    };
  };
  const deleteManyFunc = function (model) {
    return function (conditions) {
      return model.deleteMany(conditions).exec();
    };
  };
  const findFunc = function (model, refs) {
    return function (conditions) {
      let query = model.find(conditions);
      if (refs) {
        refs.forEach((ref) => {
          query = query.populate(ref);
        });
      }
      return query.exec();
    };
  };
  const findByIdFunc = function (model, refs) {
    return function (id) {
      let query = model.findById(id);
      if (refs) {
        refs.forEach((ref) => {
          query = query.populate(ref);
        });
      }
      return query.exec();
    };
  };

  return mongoose.createConnection(url, {useMongoClient: true})
      .then((conn) => {
        const Workout = conn.model('Workout', workoutSchema);
        const Plan = conn.model('Plan', planSchema);

        module.exports.deletePlans = deleteManyFunc(Plan);
        module.exports.deleteWorkouts = deleteManyFunc(Workout);

        module.exports.deletePlanById = deleteByIdFunc(Plan);
        module.exports.deleteWorkoutById = deleteByIdFunc(Workout);

        module.exports.findPlans = findFunc(Plan, ['workoutGroups.workouts']);
        // module.exports.findPlans = findFunc(Plan, []);
        module.exports.findWorkouts = findFunc(Workout);

        module.exports.findPlanById = findByIdFunc(Plan, ['workoutGroups.workouts']);
        module.exports.findWorkoutById = findByIdFunc(Workout);

        module.exports.insertPlan = insertFunc(Plan);
        module.exports.insertWorkout = insertFunc(Workout);

        module.exports.updatePlan = updateByIdFunc(Plan);
        module.exports.updateWorkout = updateByIdFunc(Workout);
      })
      .catch((err) => {
        console.log("Error connecting to " + url + ": " + err);
        throw(err)
      });
};
