import '../app.contribution.module';
import '../service/contributionRestService';
import '../../modal/confirmationModal/confirmationModalService';
import '../../report/service/reportRestService';

/**
 * @desc This Controller is responsible for handling the view 'contributionCatalogView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.contribution');

    function ContributionCatalogController(confirmationModalService, messageService,
                                           contributionRestService, springIntegrationService,
                                           beadRestService, reportRestService) {
        var vm = this;

        /**
         * List of all the existing contributions.
         * @type {Array}
         */
        vm.contributions = [];

        /**
         * Criteria used to filter all the existing contributions.
         * @type {{beadIdentificationNumber: null, campaignName: null, contributorName: null, beginCreationDate: null, endCreationDate: null, size: *|number}}
         */
        vm.filter = {
            beadIdentificationNumber: null,
            campaignName: null,
            contributorName: null,
            beginCreationDate: null,
            endCreationDate: null
        };

        /**
         * The download option object.
         * @type {string}
         */
        vm.download = {
            option: null,
            url: null
        };

        /**
         * Represents the object containing the contribution to be deleted.
         * @type {{id: null, index: null}}
         */
        const _contributionToDelete = {
            id: null,
            index: null
        };

        /**
         * Function responsible for handling the hook for the initialization of the controller.
         */
        vm.$onInit = function() {
            // Defines whether the data will be read only or not. By default it is not read only.
            vm.readOnly = vm.readOnly || false;
            // Defines the title used in the page.
            vm.title = vm.title || 'application.contribution.catalog.title.titlePage';
            // Defines the amount of data that will be presented on the grid.
            vm.filter.size = vm.size || 0;
            // Defines the order which will be displayed the result.
            vm.filter.sort = vm.sort || 'creationDate,desc';
            // Performs the first search for all existing contributions.
            vm.findAll(vm.filter);
        };

        /**
         * Defines the information used to delete a certain contribution.
         * @param contributionId The contribution identifier.
         * @param index The index where the contribution is located at the contributions array.
         */
        vm.setContributionToDelete = function(contributionId, index) {
            _contributionToDelete.id = contributionId;
            _contributionToDelete.index = index;
        };

        /**
         * Open the confirmation modal used to delete a contribution.
         */
        vm.openDeleteConfirmationModal = function() {
            confirmationModalService.open({
                title: 'application.contribution.catalog.modal.contributionDeletion.title',
                body: 'application.contribution.catalog.modal.contributionDeletion.body',
                confirmationOnClick: _deleteContribution
            });
        };

        /**
         * Search for all existing contributions in the database.
         * @param {Object} [filter] The filter to be used for the filtering action.
         *                          Ex. {{campaignName: null, contributorName: null, creationDate: null}}
         * @private
         */
        vm.findAll = function(filter) {
            contributionRestService.findAll(filter, function(response) {
                springIntegrationService.retrieveDataFromItemsLinks(response._embeddedItems, ['campaign', 'contributor'])
                    .then(function() {
                        vm.contributions = response._embeddedItems;
                    })
                    .then(_populateContributionWithBead)
                    .then(_buildDownloadUrl)
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
         * Verifies whether the download button will be disabled or not.
         * @returns {Array|boolean}
         */
        vm.isDownloadButtonDisabled = function() {
            return !vm.contributions || vm.contributions.length < 1;
        };

        /**
         * Build the download url for downloading a report.
         */
        function _buildDownloadUrl() {
            vm.download.url = reportRestService.buildDownloadUrlContributionReport(vm.contributions);
        }

        /**
         * Delete a certain contribution by their identifier.
         */
        function _deleteContribution() {
            contributionRestService.remove(_contributionToDelete.id, function() {
                vm.contributions.splice(_contributionToDelete.index,1); // Remove the element from the array.
                messageService.showSuccessMessage('application.contribution.catalog.message.successDeletion');
            });
        }

        /**
         * Populate all the contributions with its respective bead (if there is any).
         * @private
         */
        function _populateContributionWithBead() {
            // Retrieve all the beads and search for the match for each found contribution.
            beadRestService.findAll(function(response) {
                springIntegrationService.retrieveDataFromItemsLinks(response._embeddedItems, ['campaign', 'contributor'])
                    .then(function() {
                        vm.contributions.forEach(function(contribution) {
                            // Find the bead that is associated to the contribution.
                            var bead = response._embeddedItems.filter(function(bead) {
                                return bead.contributor.id === contribution.contributor.id && bead.campaign.id === contribution.campaign.id;
                            });
                            contribution.bead = bead[0];
                        });
                    });
            });
        }
    }
    module.controller('contributionCatalogController', [
        'confirmationModalService',
        'messageService',
        'contributionRestService',
        'springIntegrationService',
        'beadRestService',
        'reportRestService',
        ContributionCatalogController
    ]);
}());
