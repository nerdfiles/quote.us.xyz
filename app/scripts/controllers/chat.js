'use strict';
/**
 * @ngdoc function
 * @name safeandsecurereturnsComApp.controller:ChatController
 * @description
 * # ChatController
 * Conversational UI for with Lenders.
 */
define([
  "interface"
], function (__interface__){

  var ChatController = function ($scope, Ref, $firebaseArray, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = $firebaseArray(Ref.child('messages').limitToLast(10));

    // display any errors
    $scope.messages.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        // push a message to the end of the array
        $scope.messages.$add({text: newMessage})
          // display any errors
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  };

  return [
    "$scope",
    "Ref",
    "$firebaseArray",
    "$timeout",
    ChatController
  ];
});
