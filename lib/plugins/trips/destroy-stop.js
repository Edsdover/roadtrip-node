'use strict';

var Trip = require('../../models/trip');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/trips/{tripId}/stops/{stopId}',
    config: {
      description: 'Delete a stop to a trip',
      handler: function(request, reply){
        Trip.findByIdAndUpdate(request.params.tripId, {$pull: { stops: {_id: request.params.stopId}}}, function(){
          return reply({stopId: request.params.stopId});
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'trips.destroy-stop'
};
