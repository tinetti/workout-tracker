const Promise = require('bluebird');

const server = require('../server.js');
const service = require('../lib/service.js');
const data = require('../lib/data.js');

const beforeEach = require("mocha").beforeEach;
const before = require("mocha").before;
const describe = require("eslint/lib/testers/event-generator-tester").describe;
const it = require("eslint/lib/testers/event-generator-tester").it;

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const app = server.app;
const request = function () {
  return chai.request(app);
};

const config = {
  mongo: {
    url: 'mongodb://localhost:27017/workout-tracker-test'
  },
  http: {
    port: 3030
  }
};

describe('app', function () {
  before(function () {
    return server.start(config);
  });
  after(function () {
    server.stop();
  });

  beforeEach(function () {
    return Promise.all([
      service.deletePlans(),
      service.deleteWorkouts(),
    ]);
  });

  it('cruds plans', function () {
    return data.init()

    // list
        .then(() => {
          return request().get('/api/plans')
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(1);
          expect(res.body[0]).to.have.property('name', 'Body Beast');
          return res.body;
        })

        // update
        .then(function (plans) {
          const plan = plans[0];
          plan.name = 'P90X';
          return request().put('/api/plans/' + plan._id).send(plan);
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          return res.body;
        })

        // get
        .then(function (plan) {
          return request().get('/api/plans/' + plan._id);
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name', 'P90X');
          return res.body;
        })

        // delete
        .then(function (plan) {
          return request().delete('/api/plans/' + plan._id);
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          return res.body;
        })
        .then(function (deleted) {
          return request().get('/api/plans/' + deleted.id)
              .then(function (res) {
                throw new Error('should have thrown "Not Found" error');
              })
              .catch(function (err) {
                expect(err).to.have.property('status', 404);
              })
        });
  });

  it('gets workouts', function () {
    return data.init()
        .then(() => {
          return request()
              .get('/api/workouts')
              .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(1);
                expect(res.body[0]).to.have.property('name', 'Body Beast');
              });
        });
  });

  it('updates workout', function () {
    return request()
        .get('/api/workouts')
        .then(function (res) {
          const workout = res.body[0];
          workout.name = 'P90X';


          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(1);
          expect(res.body[0]).to.have.property('name', 'Body Beast');
        });
  });
})
;
