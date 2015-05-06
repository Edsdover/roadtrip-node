'use strict';

var Trip = require('../../models/trip');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/trips/{tripId}',
    config: {
      description: 'Delete a trip',
      handler: function(request, reply){
        Trip.findOne({_id: request.params.tripId, userId: request.auth.credentials._id}, function(err, trip){
          trip.remove(function(){
            reply(request.params);
          });
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'trips.destroy'
};
