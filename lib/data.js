const service = require('./service.js');

const backAndBisWorkout = module.exports.backAndBisWorkout = {
  name: 'Back and Bis',
  exercises: [{
    name: 'Deadlift',
    sets: [
      {targetReps: 15},
      {targetReps: 12},
      {targetReps: 18},
      {targetReps: 18},
    ]
  }, {
    name: 'Pull Over',
    sets: [
      {targetReps: 15},
      {targetReps: 12},
      {targetReps: 18},
      {targetReps: 18},
    ]
  }]
};

module.exports.init = (app) => {
  const createOrUpdateWorkoutByName = function (workout) {
    return service.findWorkouts({name: workout.name}).then(function (workouts) {
      if (workouts.length === 0) {
        console.log("Inserting workout: " + workout.name);
        return service.insertWorkout(workout);
      }
    });
  };

  return createOrUpdateWorkoutByName(backAndBisWorkout).catch(function (err) {
    console.log("Error: " + err);
  });
};