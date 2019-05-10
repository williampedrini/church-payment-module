import '../app.modal.module';
import './confirmationModalController';

/**
 * @desc This Controller is responsible for handling the services for the 'confirmationModalView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.modal');

    function ConfirmationModalService($uibModal) {

        /**
         * Open the confirmation modal used to delete a contributor.
         * @param properties {Object} {{title: null, body: null, onConfirmationClick: function(){}}}
         * @return {promise} The promise containing the created modal.
         */
        function _open(properties) {
            return $uibModal.open({
                templateUrl: 'app/component/modal/confirmationModal/confirmationModalView.html',
                controller: 'confirmationModalController as vm',
                resolve: {
                    properties: function() {
                        return properties;
                    }
                }
            });
        }
        return {
            open : _open
        }
    }
    module.service('confirmationModalService', [
        '$uibModal',
        ConfirmationModalService
    ]);
}());