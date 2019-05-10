import '../app.campaign.module';
import '../service/campaignRestService';
import '../../modal/confirmationModal/confirmationModalService';

/**
 * @desc This Controller is responsible for handling the view 'campaignCatalogView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.campaign');

    function CampaignCatalogController(confirmationModalService, messageService,
                                       campaignRestService, springIntegrationService) {
        const vm = this;

        /**
         * List of all the existing campaigns.
         * @type {Array}
         */
        vm.campaigns = [];

        /**
         * Criteria used to filter all the existing campaigns.
         * @type {{name: null}}
         */
        vm.filter = {
            name: null
        };

        /**
         * Represents the object containing the campaign to be deleted.
         * @type {{id: null, index: null}}
         */
        const _campaignToDelete = {
            id: null,
            index: null
        };

        /**
         * Function responsible for handling the hook for the initialization of the controller.
         */
        vm.onInit = function() {
            vm.findAll(null);
        };

        /**
         * Defines the information used to delete a certain campaign.
         * @param campaignId The campaign identifier.
         * @param index The index where the campaign is located at the campaigns array.
         */
        vm.setCampaignToDelete = function(campaignId, index) {
            _campaignToDelete.id = campaignId;
            _campaignToDelete.index = index;
        };

        /**
         * Open the confirmation modal used to delete a campaign.
         */
        vm.openDeleteConfirmationModal = function() {
            confirmationModalService.open({
                title: 'application.campaign.catalog.modal.campaignDeletion.title',
                body: 'application.campaign.catalog.modal.campaignDeletion.body',
                confirmationOnClick: _deleteCampaign
            });
        };

        /**
         * Search for all existing campaigns in the database.
         * @param {Object} [filter] The filter to be used for the filtering action. Ex. {{name: null}}
         * @private
         */
        vm.findAll = function(filter) {
            campaignRestService.findAll(filter, function(response) {
                springIntegrationService.retrieveDataFromItemsLinks(response._embeddedItems, ['provingType'])
                    .then(function() {
                        vm.campaigns = response._embeddedItems;
                    });
            });
        };

        /**
         * Clean all the properties from the filter.
         */
        vm.clearFilter = function() {
           // Clean all filter criteria.
            for(var key in vm.filter) {
                vm.filter[key] = null;
            }
            vm.findAll(vm.filter);
        };

        /**
         * Delete a certain campaign by their identifier.
         */
        function _deleteCampaign() {
            campaignRestService.remove(_campaignToDelete.id, function() {
                vm.campaigns.splice(_campaignToDelete.index,1); // Remove the element from the array.
                messageService.showSuccessMessage('application.campaign.catalog.message.successDeletion');
            });
        }
    }
    module.controller('campaignCatalogController', [
        'confirmationModalService',
        'messageService',
        'campaignRestService',
        'springIntegrationService',
        CampaignCatalogController
    ]);
}());