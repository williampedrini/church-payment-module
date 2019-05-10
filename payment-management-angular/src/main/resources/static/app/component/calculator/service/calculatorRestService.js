import '../app.calculator.module';

/**
 * @desc Defines the functions used to execute HTTP requests to retrieve or manage the content of a calculator.
 * @param $resource The responsible for configuring the api entry points.
 * @author William Custodio
 */
(function () {
    'use strict';

    var module = angular.module('paymentManagement.calculator');

    function CalculatorRestService(environmentConfig, $resource) {

        var resources = $resource(environmentConfig.apiBaseUrl + '/calculators/:action', null, {
            'getContributionCalculationByMonthAndYear': {
                method: 'GET',
                isArray: true,
                params: {
                    action: 'contributions'
                }
            }
        });

        /**
         * Get the sum of all contributions by a specific month and year.
         *
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _getContributionCalculationByMonthAndYear(successCallback, errorCallback) {
            return resources.getContributionCalculationByMonthAndYear(null, null, successCallback, errorCallback);
        }

        return {
            getContributionCalculationByMonthAndYear: _getContributionCalculationByMonthAndYear
        }
    }
    module.service('calculatorRestService', ['environmentConfig', '$resource', CalculatorRestService]);
}());