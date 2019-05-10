import 'sprintf-js';

import '../app.contributor.module';
import '../service/contributorRestService';
import '../config/app.contributor.constant';
import '../../modal/confirmationModal/confirmationModalService';
import '../../report/service/reportRestService';

/**
 * @desc This Controller is responsible for handling the view 'contributorCatalogView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const contributorModule = angular.module('paymentManagement.contributor');

    function ContributorCatalogController(confirmationModalService, messageService,
                                          contributorRestService, CELEBRATION_CATALOG,
                                          reportRestService, DOWNLOAD_URL_CATALOG) {
        const vm = this;

        /**
         * List of all the existing contributors.
         * @type {Array}
         */
        vm.contributors = [];

        /**
         * Criteria used to filter all the existing contributors.
         * @type {{name: null, beginBirthDate: null, endBirthDate: null, beginMarriageDate: null, endMarriageDate: null}}
         */
        vm.filter = {
            name: null,
            celebration: null,
            beginDate: null,
            endDate: null
        };

        /**
         * Represents the object containing the contributor to be deleted.
         * @type {{id: null, index: null}}
         */
        const _contributorToDelete = {
          id: null,
          index: null
        };

        /**
         * Catalog with all existing celebrations.
         */
        vm.celebration = CELEBRATION_CATALOG;

        /**
         * Catalog with all existing urls.
         */
        vm.downloadUrls = DOWNLOAD_URL_CATALOG;

        /**
         * The download option object.
         * @type {string}
         */
        vm.download = {
            option: null,
            url: null
        };

        /**
         * Function responsible for handling the hook for the initialization of the controller.
         */
        vm.onInit = function() {
            // Defines whether the data will be read only or not. By default it is not read only.
            vm.readOnly = vm.readOnly || false;
            // Defines the title used in the page.
            vm.title = vm.title || 'application.contributor.catalog.title.titlePage';
            // Defines the amount of data that will be presented on the grid.
            vm.filter.size = vm.size || 0;
            // Defines the order which will be displayed the result.
            vm.filter.sort = vm.sort || 'name,asc';
            // Performs the first search for all existing contributors.
            vm.findAll(vm.filter);
        };

        /**
         * Defines the information used to delete a certain contributor.
         * @param contributorId The contributor identifier.
         * @param index The index where the contributor is located at the contributors array.
         */
        vm.setContributorToDelete = function(contributorId, index) {
            _contributorToDelete.id = contributorId;
            _contributorToDelete.index = index;
        };

        /**
         * Open the confirmation modal used to delete a contributor.
         */
        vm.openDeleteConfirmationModal = function() {
            confirmationModalService.open({
                title: 'application.contributor.catalog.modal.contributorDeletion.title',
                body: 'application.contributor.catalog.modal.contributorDeletion.body',
                confirmationOnClick: _deleteContributor
            });
        };

        /**
         * Search for all existing contributors in the database.
         * @param {Object} [filter] The filter to be used for the filtering action. Ex. {{name: null}}
         * @private
         */
        vm.findAll = function(filter) {
            if(_isFilterValid(filter)) {
                contributorRestService.findAll(filter, function(response) {
                    vm.contributors = response;
                    // Refresh the download url according to the filter.
                    vm.buildDownloadUrl();
                });
            }
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
         * Handle the 'contributorRegisterFieldDownloadUrl' change event.
         */
        vm.contributorRegisterFieldDownloadUrlOnChange = function() {
            if(vm.download.option === DOWNLOAD_URL_CATALOG[1].value && !(vm.filter.celebration && vm.filter.beginDate && vm.filter.endDate)) {
                messageService.showWarningMessage('application.contributor.catalog.messages.celebration.downloadDateRange');
                return;
            }
            vm.buildDownloadUrl();
        };

        /**
         * Build the download url for downloading a report.
         */
        vm.buildDownloadUrl = function() {
            if(vm.download.option === DOWNLOAD_URL_CATALOG[0].value) {
                vm.download.url = reportRestService.buildDownloadUrlTagReport(vm.contributors);
            } else if(vm.download.option === DOWNLOAD_URL_CATALOG[1].value) {
                vm.download.url = reportRestService.buildDownloadUrlCelebrationReport(vm.contributors,
                    vm.filter.celebration, vm.filter.beginDate, vm.filter.endDate);
            } else if(vm.download.option === DOWNLOAD_URL_CATALOG[2].value) {
                vm.download.url = reportRestService.buildDownloadUrlContributionByContributorReport(vm.contributors);
            }
        };

        /**
         * Verifies if the download button is disabled or not.
         * @returns {boolean}
         */
        vm.isDownloadButtonDisabled = function() {
            return (vm.download.option === DOWNLOAD_URL_CATALOG[1].value && !(vm.filter.celebration && vm.filter.beginDate && vm.filter.endDate))
                || !vm.download.option || !vm.contributors || vm.contributors.length < 1;
        };

        /**
         * Validate if all the filter's fields are valid.
         * @param filter The filter to be validated.
         *  @returns {boolean} <code>true</code>: The filter is valid. </br>
         *                     <code>false</code>: The filter is not valid.
         */
        function _isFilterValid(filter) {
            if(_isCelebrationInvalid(filter)) {
                messageService.showErrorMessage('application.contributor.catalog.messages.celebration.empty');
                return false;
            }
            if(_isCelebrationDateEmpty(filter)) {
                messageService.showErrorMessage('application.contributor.catalog.messages.celebration.dateRange.empty');
                return false;
            }
            return true;
        }

        /**
         * Verifies whether the celebration filter is valid or not.
         * @param filter The filter with the fields to be validated.
         * @returns {boolean} <code>true</code>: The celebration is not valid. </br>
         *                    <code>false</code>: The celebration is valid.
         * @private
         */
        function _isCelebrationInvalid(filter) {
            return filter && !filter.celebration && (filter.beginDate || filter.endDate);
        }

        /**
         * Verifies whether the celebration date filter is valid or not.
         * @param filter The filter with the fields to be validated.
         * @returns {boolean} <code>true</code>: The celebration date is not valid. </br>
         *                    <code>false</code>: The celebration date is valid.
         * @private
         */
        function _isCelebrationDateEmpty(filter) {
            return filter && filter.celebration && !filter.beginDate && !filter.endDate;
        }

        /**
         * Delete a certain contributor by their identifier.
         */
        function _deleteContributor() {
            contributorRestService.remove(_contributorToDelete.id, function() {
                vm.contributors.splice(_contributorToDelete.index,1); // Remove the element from the array.
                messageService.showSuccessMessage('application.contributor.register.message.successDeletion');
            });
        }
    }
    contributorModule.controller('contributorCatalogController', [
        'confirmationModalService',
        'messageService',
        'contributorRestService',
        'CELEBRATION_CATALOG',
        'reportRestService',
        'DOWNLOAD_URL_CATALOG',
        ContributorCatalogController
    ]);
}());
