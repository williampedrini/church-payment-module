import '../../contribution/app.contribution.module';
import '../../report/app.report.module';

/**
 * @desc This Controller is responsible for handling the view 'contributionCalculatorView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.calculator');

    function ContributionCalculatorController(calculatorRestService, reportRestService) {

        var vm = this;

        /**
         * List of all the existing results from the calculation.
         * @type {Array}
         */
        vm.results = [];

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
        vm.$onInit = function() {
            _getContributionCalculationByMonthAndYear();
            _buildDownloadUrl();
        };

        /**
         * Verifies whether the download button will be disabled or not.
         * @returns {Array|boolean}
         */
        vm.isDownloadButtonDisabled = function() {
            return !vm.results || vm.results.length < 1;
        };

        /**
         * Build the download url for downloading a report.
         */
        function _buildDownloadUrl() {
            vm.download.url = reportRestService.buildDownloadUrlCampaignReport();
        }

        /**
         * Get the sum of all contributions by a specific month and year.
         * @private
         */
        function _getContributionCalculationByMonthAndYear() {
            calculatorRestService.getContributionCalculationByMonthAndYear(function(response) {
                 vm.results = response;
            });
        }
    }
    module.controller('contributionCalculatorController', [
        'calculatorRestService',
        'reportRestService',
        ContributionCalculatorController
    ]);
}());
