'use strict';
angular.module('main').controller('StartCtrl', function ($scope, $window, DataService) {
  var self = this;
  DataService.getData();
  this.data = DataService.store.data;
  //$scope.data = DataService.store.data;
  // Fill the data map with random data
  $scope.refresh = function () {
    var MYLIST;
    MYLIST = $window.React.createClass({
      displayName: 'MYLIST',
      clickHandler: function (ev) {
        console.log('Still in reactJs');
        console.log(ev);
      },
      render: function () {
        var self = this;
        var data = this.props.data;
        var rows = data.map(function (row) {
          return (
            $window.React.DOM.a({
                className: 'item item-light ',
                onClick: self.clickHandler
              },
              $window.React.DOM.span(
                {className: 'row'},
                $window.React.DOM.span({className: 'col-25'}, row['0']),
                $window.React.DOM.span({className: 'col-25'}, row['1']),
                $window.React.DOM.span({className: 'col-25'}, row['2']),
                $window.React.DOM.span({className: 'col-25'}, row['3']),
                $window.React.DOM.span({className: 'col-25'}, row['4'])
              )
            )
          );
        });

        return (
          $window.React.DOM.div({
              className: 'list',
              onClick: this.clickHandler
            },
            rows
          )
        );
      }
    });

    DataService.getData();
    $window.React.render(
      $window.React.createElement(MYLIST, {
        data: self.data
      }),
      document.getElementById('blubber-hannes')
    );
  };
  $scope.log = function (msg, index) {
    if (index === 1499) {
      console.log(msg, performance.now());
    }
  };
  $scope.refresh();
})
  .service('DataService', function Dataservice() {
    var self = this;
    this.store = {
      data: []
    };
    this.getData = function () {
      for (var i = 0; i < 1400; ++i) {
        self.store.data[i] = {};
        //$scope.log('for end', i);
        for (var j = 0; j < 5; ++j) {
          self.store.data[i][j] = i + ' <> ' + j;
        }
      }
      return self.store;
    };
  });
