import '../app.contribution.module';

/**
 * @desc Defines the functions used to execute HTTP requests to retrieve or manage the content of a Contribution.
 * @param $resource The responsible for configuring the api entry points.
 * @author William Custodio
 */
(function () {
    'use strict';

    var contributionModule = angular.module('paymentManagement.contribution');

    function ContributionRestService(environmentConfig, $resource) {

        var resources = $resource(environmentConfig.apiBaseUrl + '/contributions/:id/:action/:subAction', null, {
            'create': {
                method: 'POST'
            },
            'update': {
                method: 'PATCH'
            },
            'remove': {
                method: 'DELETE'
            },
            'find': {
                method: 'GET'
            },
            'findAll': {
                method: 'GET',
                params: {
                    action: 'search',
                    subAction: 'findAll',
                    campaignName: '@campaignName',
                    contributorName: '@contributorName',
                    beginCreationDate: '@beginCreationDate',
                    endCreationDate: '@endCreationDate',
                    beadIdentificationNumber: '@beadIdentificationNumber',
                    size: '@size',
                    sort: '@sort'
                }
            },
            'getCalculationByMonthAndYear': {
                method: 'GET',
                params: {
                    action: 'calculations'
                }
            }
        });

        /**
         * Create a contribution.
         *
         * @params {Object} [contribution]
         *         The contribution to be persisted.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _create(contribution, successCallback, errorCallback) {
            return resources.create(null, contribution, successCallback, errorCallback);
        }

        /**
         * Update an existing contribution on the database.
         *
         * @params {number} [id]
         *         The identifier of the contribution to be updated.
         * @params {Object} [contribution]
         *         The contribution to be updated.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _update(id, contribution, successCallback, errorCallback) {
            var params = {
                id: id
            };
            return resources.update(params, contribution, successCallback, errorCallback);
        }

        /**
         * Delete an existing contribution from the database.
         *
         * @params {number} [id]
         *         The identifier of the contribution to be deleted.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle error callback.
         * @private
         */
        function _remove(id, successCallback, errorCallback) {
            var params = {
                id: id
            };
            return resources.remove(params, null, successCallback, errorCallback);
        }

        /**
         * Search for all existing contributions on the database.
         *
         * @param {Object} [filter] The filter to be used for the filtering action.
         *                          Ex. {{campaignName: null, contributorName: null, creationDate: null}}
         * @params {function} [successCallback]
         *        The function which will handle the success callback.
         * @params {function} [errorCallback]
         *      The function which will handle the error callback.
         * @return result The list of all existing contributions.
         * @private
         */
        function _findAll(filter, successCallback, errorCallback) {
            var params = {
                campaignName: filter ? filter.campaignName : null,
                contributorName: filter ? filter.contributorName : null,
                beginCreationDate: filter ? filter.beginCreationDate : null,
                endCreationDate: filter ? filter.endCreationDate : null,
                beadIdentificationNumber: filter ? filter.beadIdentificationNumber : null,
                size: filter ? filter.size : 0,
                sort: filter ? filter.sort : 'creationDate,desc'
            };
            return resources.findAll(params, null, successCallback, errorCallback);
        }

        /**
         * Search for an existing contribution on the database by its identifier.
         *
         * @params {number} [id]
         *         The identifier of the contribution to be searched.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @return result The found contribution.
         * @private
         */
        function _find(id, successCallback, errorCallback) {
            var params = {
                id: id
            };
            return resources.find(params, null, successCallback, errorCallback);
        }

        /**
         * Get the sum of all contributions by a specific month and year.
         *
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _getCalculationByMonthAndYear(successCallback, errorCallback) {
            return resources.getCalculationByMonthAndYear(null, null, successCallback, errorCallback);
        }

        return {
            create: _create,
            update: _update,
            remove: _remove,
            find: _find,
            findAll: _findAll,
            getCalculationByMonthAndYear: _getCalculationByMonthAndYear
        }
    }

    contributionModule.service('contributionRestService', ['environmentConfig', '$resource', ContributionRestService]);
}());