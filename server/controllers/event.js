const mongoose = require('mongoose');

const Event = require('../models/Event');

module.exports.getAllEvents = (req, res, next) => {
  Event.find({}).then(events => res.json({
    events
  })).catch(error => {
    console.error(error);
    next(error);
  });
};

module.exports.createEvent = (req, res, next) => {
  const eventName = req.body.name;
  const newEvent = new Event({ 
    name: eventName
  });

  newEvent.save().then(() => {
    res.json({
      'data': `event ${eventName} created`
    });
  }).catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.json({
        'error': error.errors
      })
    }
    next(error);
  });
};

module.exports.editEvent = (req, res, next) => {
  const { id } = req.params;

  Event.findById(id).then(event => {
    if (event) {
      Object.assign(event, req.body);
      event.save().then(() => {
        res.json({
          'data': 'event edited'
        })
      }).catch(error => {
        console.log(error);
        next(error);
      });
    }
  }).catch(error => {
    console.log(error);
    next(error);
  });
};