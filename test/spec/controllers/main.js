'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('quote_us'));

  var MainCtrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of quotes to the scope', function () {
    expect(scope.quotes.length).toBeTruthy();
  });
});
