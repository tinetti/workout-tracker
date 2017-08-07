const bodyParser = require("body-parser");
const service = require('./service.js');

module.exports.init = (app) => {
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  const errorHandler = (desc, res) => {
    return (err) => {
      const message = `Error occurred attempting to ${desc}`;
      console.log(message + " - " + err);
      res.status(500);
      res.json({message: message});
    }
  };

  app.post('/api/plans', (req, res) => {
    const plan = req.body;
    service.insertPlan(plan).then((saved) => {
      res.json(saved);
    }, errorHandler("insert plan", res));
  });

  app.put('/api/plans/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    service.updatePlan(id, updates).then(() => {
      service.getPlan(id).then((plan) => {
        res.json(plan);
      });
    }, errorHandler("update plan", res));
  });

  app.delete('/api/plans/:id', (req, res) => {
    const id = req.params.id;
    service.deletePlan(id).then((plan) => {
      res.json(plan);
    }, errorHandler("delete plan", res));
  });

  app.get('/api/plans', (req, res) => {
    service.findPlans().then((plans) => {
      res.json(plans);
    }, errorHandler("list plans", res));
  });

  app.get('/api/plans/:id', (req, res) => {
    const id = req.params.id;
    service.getPlan(id).then((plan) => {
      res.json(plan);
    }, errorHandler("get plan", res));
  });


  app.post('/api/exercises', (req, res) => {
    const exercise = req.body;
    service.insertExercise(exercise).then((saved) => {
      res.json(saved);
    }, errorHandler("insert exercise", res));
  });

  app.put('/api/exercises/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    service.updateExercise(id, updates).then(() => {
      service.getExercise(id).then((exercise) => {
        res.json(exercise);
      });
    }, errorHandler("update exercise", res));
  });

  app.delete('/api/exercises/:id', (req, res) => {
    const id = req.params.id;
    service.deleteExercise(id).then((exercise) => {
      res.json(exercise);
    }, errorHandler("delete exercise", res));
  });

  app.get('/api/exercises', (req, res) => {
    service.findExercises().then((exercises) => {
      res.json(exercises);
    }, errorHandler("list exercises", res));
  });

  app.get('/api/exercises/:id', (req, res) => {
    const id = req.params.id;
    service.getExercise(id).then((exercise) => {
      res.json(exercise);
    }, errorHandler("get exercise", res));
  });
};
