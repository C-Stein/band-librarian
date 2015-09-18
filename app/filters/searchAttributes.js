app.filter('searchAttributes', function() {
   
  return function(piece, attributes) {
    var filtered = [];
    if (attributes === undefined) {
      return piece;
      } else {
      angular.forEach(piece, function(title) {
        angular.forEach(attributes, function(value, key, obj) {
          if (title[key] === value && containsObject(title, filtered) === false) {
            filtered.push(title);
          } 
        });
      });
    console.log("attributes", attributes);
    return filtered;
    }
  };
});

function containsObject(obj, list) {
 var res = _.find(list, function(val){ return _.isEqual(obj, val);});
 return (_.isObject(res))? true:false;
}
