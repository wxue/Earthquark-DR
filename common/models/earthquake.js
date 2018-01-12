module.exports = function(Earthquake) {
    /*
   *  get most dangerous regions
   */ 
  Earthquake.getMostDangerousRegions = function(count, days, region_type, res, cb) {
    // set default filters
    var filters = {};
    if (!count) count = 10;
    if (!days) days = 30;
    if (!region_type) region_type = 'area';

    var time_offset = days*24*60*60*1000; // days*hours*minutes*seconds*milliseconds

    filters.limit = count;
    filters.where = {and:[]};
    filters.where.and.push({createTime:{gte: Date.now()-time_offset}});
    return Earthquake.find({filters}).then(function(records) {
      console.log(records);
      // return result;
    });

  };

  Earthquake.remoteMethod('getMostDangerousRegions', {
    accepts: [
      {arg: 'count', type: 'number', required: false, description: 'Number of results to return'},
      {arg: 'days', type: 'number', required: false, description: 'Number of days to consider'},
      {arg: 'region_type', type: 'string', required: false, description: 'Region grouping/clustering to use'},
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    returns: [
      {arg: 'result', type: 'array'}
    ],
    http: {path: '/regions', verb: 'post'}
  });

};
