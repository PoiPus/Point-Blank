(function () {
  'use strict';
  angular
    .module('point-blank.search')
    .factory('poiService', poiService);

  poiService.$inject = ['$http'];

  function poiService ($http) {
    var addReviewPoiData = function (poireview) {
      return $http({
        method: 'POST',
        url: '/api/review',
        data: poireview
      })
      .then(function (results) {
        console.log(results)
        return results;
      });
    };

    var grabSinglePoiData = function (poiInfo) {
      return $http({
        method: 'GET',
        url: '/api/poi/' + poiInfo,
        headers: {'Content-Type': 'application/json'},
        data: {'name': 'poiInfo'}
      })
      .then(function (results) {
        console.log(results.data)
        return results.data;
      });
    };

    return {
      addReviewPoiData: addReviewPoiData,
      grabSinglePoiData: grabSinglePoiData
    };
  }


  var chart = c3.generate({
    donut: {
        title: "Iris Petal Width"
    }
  });



})();
