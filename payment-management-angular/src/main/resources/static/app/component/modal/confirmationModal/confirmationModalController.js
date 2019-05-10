import '../app.modal.module';

/**
 * @desc This Controller is responsible for handling the view 'confirmationModalView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.modal');

    /**
     * Function responsible for handling the DOM manipulation.
     * @param $q {Object} Responsible creating promises.
     * @param $uibModalInstance {Object} Responsible for dealing with the modal.
     * @param properties {Object} {{title: null, body: null, confirmationOnClick: function(){}}}
     * @constructor
     */
    function ConfirmationModalController($q, $uibModalInstance, properties) {

        const vm = this;
        vm.title = properties.title || '';
        vm.body = properties.body || '';

        /**
         * Handles the onClick action for the 'OK' button.
         */
        vm.confirmationOnClick = function() {
            $q.when(properties.confirmationOnClick()).then(vm.closeOnClick());
        };

        /**
         * Closes the modal.
         */
        vm.closeOnClick = function() {
            $uibModalInstance.dismiss();
        }
    }
    module.controller('confirmationModalController', [
        '$q',
        '$uibModalInstance',
        'properties',
        ConfirmationModalController
    ]);
}());