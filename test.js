angular.module('fasterAngular', ['doTA']).
  controller('mycontroller', ['$scope', 'DataService', function ($scope, DataService) {

    // Fill the data map with random data
    $scope.refresh = function () {
      console.log(performance.now());
      $scope.data = [];
      for (var i = 0; i < 1500; ++i) {
        $scope.data[i] = {};
        $scope.log('for end', i);
        for (var j = 0; j < 5; ++j) {
          $scope.data[i][j] = Math.random();
        }

      }
    }

    $scope.getData = function (index) {
      if (index === 1499) {
        console.log(msg, performance.now());
      }
    }
    $scope.log = function (msg, index) {
      if (index === 1499) {
        console.log(msg, performance.now());
      }

    }

    $scope.refresh();

  }])
  .service('DataService', function Dataservice() {
    var self = this;
    this.store = {
      data: []
    };

    this.getData = function () {
      for (var i = 0; i < 1500; ++i) {
        self.store.data[i] = {};
        //$scope.log('for end', i);
        for (var j = 0; j < 5; ++j) {
          self.store.data[i][j] = Math.random();
        }
      }
    }
  })
  .directive('fastRepeat', ['scope', 'el', 'attrs',function () {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link:  function (scope, el, attrs) {
        // Code goes here
        console.log('test');
        var MYLIST = React.createClass({
          displayName: 'MYLIST',
          render: function () {
            var data = this.props.data
            var rows = data.map(function (datum) {
              var clickHandler = function (ev) {
                console.log("Still in reactJs");
                console.log(ev);
              }

              return (
                React.DOM.tr({
                    onClick: clickHandler
                  },
                  React.DOM.td(null, datum['0']),
                  React.DOM.td(null, datum['1']),
                  React.DOM.td(null, datum['2']),
                  React.DOM.td(null, datum['3']),
                  React.DOM.td(null, datum['4'])
                )
              );
            });

            return (
              React.DOM.table(null,
                rows
              )
            );
          }
        });
        console.log('scope.data', scope.data);
        scope.$watchCollection('data', function (newValue, oldValue) {
          React.render(
            React.createElement(MYLIST, {
              data: newValue
            }),
            el[0]
          );
        })
      }
    }
  }]);