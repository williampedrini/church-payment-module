/**
 * @desc This is the definition of a component responsible for handling the messages to be shown for the user.
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.message');

    module.component('message', {
        restrict: 'E',
        controller: 'messageController as vm',
        templateUrl: 'app/component/message/messageView.html'
    });
}());