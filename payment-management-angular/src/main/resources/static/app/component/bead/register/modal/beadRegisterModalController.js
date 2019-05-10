import '../../app.bead.module';
import '../../service/beadRestService';
import '../../config/app.bead.constant';
import '../../../campaign/service/campaignRestService';

import '../../../../shared/form/validator/formValidatorService';

/**
 * @desc This Controller is responsible for handling the view 'beadRegisterModalView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.bead');

    function BeadRegisterModalController($scope, $q, $uibModalInstance, properties, beadRestService,
                                         springIntegrationService, campaignRestService, formValidatorService,
                                         messageService, BEAD_LINK_PROPERTY_MAPPER) {
        const vm = this;

        /**
         * The bead to be used for the registration.
         * @type {Object}
         */
        vm.bead = properties.bead || {};

        /**
         * The array containing all the beads associated to a certain contributor.
         * @type {*|Array}
         */
        vm.beads = properties.beads;

        /**
         * List of all the existing campaigns.
         * @type {Array}
         */
        vm.campaigns = [];

        /**
         * Function responsible for handling the hook for the initialization of the controller.
         */
        vm.onInit = function() {
            _findAllByProvingType('TLO');
        };

        /**
         * Handles the onClick action for the 'OK' button.
         */
        vm.confirmationOnClick = function() {
            $q.when(_saveBead()).then(vm.closeOnClick());
        };

        /**
         * Closes the modal.
         */
        vm.closeOnClick = function() {
            $uibModalInstance.dismiss();
        };

        /**
         * Verifies if a certain field of the form contains error or not.
         * @param field The field name to be validated.
         * @param validation The type of the validation to be performed.
         * @returns {boolean}
         */
        vm.hasError = function(field, validation) {
            return formValidatorService.hasError($scope.beadRegisterForm, field, validation);
        };

        /**
         * Handle the on click action for the save button of a bead.
         */
        function _saveBead() {

            var bead = angular.copy(vm.bead);

            // Convert all the properties before performing the action.
            springIntegrationService.convertProperty(bead, BEAD_LINK_PROPERTY_MAPPER);

            if(_isUpdateAction()) {
                beadRestService.update(bead.id, bead, _handleUpdateSuccessCallback);
            } else if(_isCreateAction()) {
                beadRestService.create(bead, _handleCreationSuccessCallback);
            }
        }

        /**
         * Search for all existing campaigns in the database by a proving type..
         * @param provingType The proving type mnemonic used for the search.
         * @private
         */
        function _findAllByProvingType(provingType) {
            // Retrieve only the companies that have the proving type as a bead.
            campaignRestService.findAllByProvingType(provingType, function(response) {
                vm.campaigns = response._embeddedItems;
            });
        }

        /**
         * Handle the update success callback.
         * @private
         */
        function _handleUpdateSuccessCallback() {
            // Add the campaign name.
            var campaign = _getCampaignById();
            vm.bead.campaign.name = campaign.name;
            messageService.showSuccessMessage('application.bead.register.message.successUpdate');
        }

        /**
         * Handle the creation success callback.
         * @param response The response obtained from the server.
         * @private
         */
        function _handleCreationSuccessCallback(response) {

            // Add the campaign name.
            var campaign = _getCampaignById();
            vm.bead.campaign.name = campaign.name;

            // Update  the data associated to the current bead.
            vm.bead.id = response.id;

            // Add the bead into the array of beads.
            vm.beads.push(vm.bead);

            messageService.showSuccessMessage('application.bead.register.message.successCreation');
        }

        /**
         * Get a campaign from the array of campaigns by an identfier.
         * @param campaignId The campaign identifier.
         * @returns {*} The found campaign.
         * @private
         */
        function _getCampaignById() {
            // Get the campaign associated to the bead.
            var campaigns = vm.campaigns.filter(function(campaign){
                return campaign.id === vm.bead.campaign.id;
            });
            return campaigns[0];
        }

        /**
         * Verifies if the action is an update.
         * @returns {Boolean}
         * @private
         */
        function _isUpdateAction() {
            return vm.id || vm.bead.id;
        }

        /**
         * Verifies if the action is an create.
         * @returns {boolean}
         * @private
         */
        function _isCreateAction() {
            return !vm.id && !vm.bead.id;
        }
    }
    module.controller('beadRegisterModalController', [
        '$scope',
        '$q',
        '$uibModalInstance',
        'properties',
        'beadRestService',
        'springIntegrationService',
        'campaignRestService',
        'formValidatorService',
        'messageService',
        'BEAD_LINK_PROPERTY_MAPPER',
        BeadRegisterModalController
    ]);
}());