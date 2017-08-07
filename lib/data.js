const service = require('./service.js');

module.exports.init = (app) => {
  service.saveExerciseByName({name: 'Dumbbell Chest Press'});
  service.saveExerciseByName({name: 'Incline Dumbbell Fly'});

  service.saveExerciseGroupByName({name:'Chest and Tris'});
};