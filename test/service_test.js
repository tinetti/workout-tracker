const Promise = require('bluebird');

const expect = require('chai').expect;

const service = require('../lib/service.js');
const data = require('../lib/data.js');

const config = {
  mongo: {
    url: 'mongodb://localhost:27017/workout-tracker-test'
  }
};

let workout;
let plan;

describe('service', function () {
  before(function () {
    return service.init(config);
  });

  beforeEach(function () {
    return Promise.all([
      service.deletePlans(),
      service.deleteWorkouts(),
    ]).then(function () {
      return data.init();
    });
  });

  it('cruds workout', function () {
    return service.findWorkouts().then(function (workouts) {
      expect(workouts).to.have.lengthOf(2);
      return service.findWorkouts({name: 'Back and Biceps'}).then(function (workouts) {
        expect(workouts).to.have.lengthOf(1);
        expect(workouts[0]).to.have.property('name', 'Back and Biceps');
        expect(workouts[0].exerciseGroups).to.have.lengthOf(8);
        expect(workouts[0].exerciseGroups[0]).to.have.property('name', 'Set 1 of 8');
        expect(workouts[0].exerciseGroups[0].exercises).to.have.lengthOf(1);
        expect(workouts[0].exerciseGroups[0].exercises[0]).to.have.property('name', 'Dumbbell Deadlift');
        expect(workouts[0].exerciseGroups[0].exercises[0].sets).to.have.lengthOf(4);
        expect(workouts[0].exerciseGroups[0].exercises[0].sets[0]).to.have.property('targetReps', 15);

        const _id = workouts[0]._id;
        // noinspection BadExpressionStatementJS
        expect(_id).to.not.be.undefined;

        return service.findWorkoutById(workouts[0]._id).then(function (workout) {
          expect(workout._id).to.deep.equal(_id);

          return service.updateWorkout({_id: _id, name: 'Back and Bis'}).then(function (updated) {
            expect(updated).to.have.property('name', 'Back and Bis');

            return service.deleteWorkoutById(_id).then(function (deleted) {

              return service.findWorkouts({_id: _id}).then(function (workouts) {
                expect(workouts).to.be.empty;
              });
            });
          });
        });
      });
    });
  });

  it('cruds plan', function () {
    return service.findPlans().then(function (plans) {
      expect(plans).to.have.lengthOf(1);
      expect(plans[0]).to.have.property('name', 'Body Beast');
      expect(plans[0].workoutGroups).to.have.lengthOf(1);
      expect(plans[0].workoutGroups[0]).to.have.property('name', 'Week 1');
      expect(plans[0].workoutGroups[0].workouts).to.have.lengthOf(2);
      expect(plans[0].workoutGroups[0].workouts[0]).to.have.property('name', 'Chest and Triceps');
      expect(plans[0].workoutGroups[0].workouts[1]).to.have.property('name', 'Back and Biceps');

      const _id = plans[0]._id;
      // noinspection BadExpressionStatementJS
      expect(_id).to.not.be.undefined;
      return service.findPlanById(plans[0]._id).then(function (plan) {
        expect(plan._id).to.deep.equal(_id);

        return service.updatePlan({_id: plan._id, name: 'Beast Mode'}).then(function (updated) {
          expect(updated).to.have.property('name', 'Beast Mode');

          return service.deletePlanById(_id).then(function (deleted) {

            return service.findPlans({}).then(function (plans) {
              expect(plans).to.be.empty;
            });
          });
        });
      });
    });
  });
});
