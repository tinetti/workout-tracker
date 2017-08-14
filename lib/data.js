const service = require('./service.js');

const chestAndTrisWorkout = module.exports.backAndBisWorkout = {
  name: 'Chest and Triceps',
  exerciseGroups: [{
    name: 'Set 1 of 6',
    exercises: [{
      name: 'Dumbbell Chest Press',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
        {targetReps: 8},
      ]
    }]
  }, {
    name: 'Set 2 of 6',
    exercises: [{
      name: 'Incline Dumbbell Fly',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
      ]
    }, {
      name: 'Incline Dumbbell Press',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
        {targetReps: 8},
      ]
    }]
  }, {
    name: 'Set 3 of 6',
    exercises: [{
      name: 'Close Grip Dumbbell Press',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
      ]
    }, {
      name: 'Partial Dumbbell Fly',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
      ]
    }, {
      name: 'Decline Push-Up',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
      ]
    }]
  }, {
    name: 'Set 4 of 6',
    exercises: [{
      name: 'Laying Tricep Extension',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
        {targetReps: 8},
      ]
    }]
  }, {
    name: 'Set 5 of 6',
    exercises: [{
      name: 'Single Arm Tricep Kickback',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
        {targetReps: 8},
      ]
    }, {
      name: 'Diamond Push-Up',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
      ]
    }]
  }, {
    name: 'Set 6 of 6',
    exercises: [{
      name: 'Dips',
      sets: [
        {targetSeconds: 60}
      ]
    }]
  }]
};

const backAndBisWorkout = module.exports.backAndBisWorkout = {
  name: 'Back and Biceps',
  exerciseGroups: [{
    name: 'Set 1 of 8',
    exercises: [{
      name: 'Dumbbell Deadlift',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
        {targetReps: 8},
      ]
    }]
  }, {
    name: 'Set 2 of 8',
    exercises: [{
      name: 'Dumbbell Pull-Over',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
        {targetReps: 8},
      ]
    }, {
      name: 'Pull-Up',
      sets: [
        {targetReps: 10},
        {targetReps: 10},
        {targetReps: 10},
      ]
    }]
  }, {
    name: 'Set 3 of 8',
    exercises: [{
      name: 'Curl Bar Row',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
      ]
    }, {
      name: 'One-Arm Dumbbell Row',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
      ]
    }, {
      name: 'Reverse Fly',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
      ]
    }]
  }, {
    name: 'Set 4 of 8',
    exercises: [{
      name: 'Close Grip Chin-Up',
      sets: [
        {targetSeconds: 30},
        {targetSeconds: 30},
        {targetSeconds: 30},
      ]
    }]
  }, {
    name: 'Set 5 of 8',
    exercises: [{
      name: 'Seated Bicep Curl',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
        {targetReps: 8},
      ]
    }]
  }, {
    name: 'Set 6 of 8',
    exercises: [{
      name: 'Hammer Curl',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
      ]
    }]
  }, {
    name: 'Set 7 of 8',
    exercises: [{
      name: 'Curl Bar Bicep Curl',
      sets: [
        {targetReps: 15},
        {targetReps: 12},
        {targetReps: 8},
        {targetReps: 8},
      ]
    }]
  }, {
    name: 'Set 8 of 8',
    exercises: [{
      name: 'Superman to Airplane',
      sets: [
        {targetSeconds: 30},
        {targetSeconds: 30},
      ]
    }]
  }]
};

const createOrUpdatePlanByName = function (plan, workoutGroups) {
  return service.findPlans({name: plan.name}).then(function (plans) {
    if (plans.length === 0) {
      console.log("data.js -- Saving plan: " + plan.name);
      return service.insertPlan(plan);
    }
  });
};

const createOrUpdateWorkoutByName = function (workout) {
  return service.findWorkouts({name: workout.name}).then(function (workouts) {
    if (workouts.length === 0) {
      console.log("data.js -- Saving workout: " + workout.name);
      return service.insertWorkout(workout);
    }
  });
};

const saveBodyBeast = module.exports.saveBodyBeast = function () {
  const week1Promises = [];
  week1Promises.push(createOrUpdateWorkoutByName(chestAndTrisWorkout));
  week1Promises.push(createOrUpdateWorkoutByName(backAndBisWorkout));

  return Promise.all(week1Promises).then(function (week1Workouts) {
    return createOrUpdatePlanByName({
      name: 'Body Beast',
      workoutGroups: [{
        name: 'Week 1',
        workouts: week1Workouts,
      }]
    });
  });
};

module.exports.init = function () {
  return saveBodyBeast();
};
