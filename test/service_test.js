const expect = require('chai').expect;
const service = require('../lib/service.js');
const data = require('../lib/data.js');

const config = {
  mongo: {
    url: 'mongodb://localhost:27017/workout-tracker-test'
  }
};

describe('service', function () {
  before(function () {
    service.init(config);
    return service.deleteAllWorkouts();
  });

  it('cruds workout', function () {
    return service.insertWorkout(data.backAndBisWorkout).then(function (result) {

      return service.findWorkouts().then(function (workouts) {
        expect(workouts).to.have.lengthOf(1);
        expect(workouts[0]).to.have.property('name', 'Back and Bis');
        expect(workouts[0].exercises).to.have.lengthOf(2);
        expect(workouts[0].exercises[0]).to.have.property('name', 'Deadlift');
        expect(workouts[0].exercises[0].sets).to.have.lengthOf(4);
        expect(workouts[0].exercises[0].sets[0]).to.have.property('targetReps', 15);

        return service.findWorkoutById(workouts[0]._id).then(function (workout) {
          expect(workout).to.have.property('name', 'Back and Bis');

          return service.updateWorkout({_id: workout._id, name: 'Back and Biceps'}).then(function (updated) {
            expect(updated).to.have.property('name', 'Back and Biceps');
            expect(updated.exercises).to.have.lengthOf(2);

            return service.deleteWorkoutById(workout._id).then(function (deleted) {

              return service.findWorkouts({}).then(function (workouts) {
                expect(workouts).to.be.empty;
              });
            });
          });
        });
      });
    });
  });
});
