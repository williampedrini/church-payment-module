import '../../app.bead.module';
import './beadRegisterModalController';

/**
 * @desc This Controller is responsible for handling the services for the 'beadRegisterModalView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.bead');

    function BeadRegisterModalService($uibModal) {

        /**
         * Open the confirmation modal used to edit/created a bead.
         * @param properties {Object} {{bead: null, contributor: null}}
         * @return {promise} The promise containing the created modal.
         */
        function _open(properties) {
            return $uibModal.open({
                templateUrl: 'app/component/bead/register/modal/beadRegisterModalView.html',
                controller: 'beadRegisterModalController as vm',
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
    module.service('beadRegisterModalService', [
        '$uibModal',
        BeadRegisterModalService
    ]);
}());