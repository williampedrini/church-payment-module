import '../app.contributor.module';

/**
 * @desc Defines the functions used to execute HTTP requests to retrieve or manage the content of a Contributor.
 * @param $resource The responsible for configuring the api entry points.
 * @author William Custodio
 */
(function () {
    'use strict';

    var contributorModule = angular.module('paymentManagement.contributor');

    function ContributorRestService(environmentConfig, $resource) {

        var resources = $resource(environmentConfig.apiBaseUrl + '/contributors/:id/:action/:subAction', null, {
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
                isArray: true,
                method: 'GET',
                params: {
                    action: 'search',
                    subAction: 'findAll',
                    name: '@name',
                    beginDate: '@beginDate',
                    endDate: '@endDate',
                    celebration: '@celebration'
                }
            }
        });

        /**
         * Create a contributor.
         *
         * @params {Object} [contributor]
         *         The contributor to be persisted.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _create(contributor, successCallback, errorCallback) {
            return resources.create(null, contributor, successCallback, errorCallback);
        }

        /**
         * Update an existing contributor on the database.
         *
         * @params {number} [id]
         *         The identifier of the contributor to be updated.
         * @params {Object} [contributor]
         *         The contributor to be updated.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _update(id, contributor, successCallback, errorCallback) {
            var params = {
                id: id
            };
            return resources.update(params, contributor, successCallback, errorCallback);
        }

        /**
         * Delete an existing contributor from the database.
         *
         * @params {number} [id]
         *         The identifier of the contributor to be deleted.
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
         * Search for all existing contributors on the database.
         *
         * @param {Object} [filter] The filter to be used for the filtering action.
         * Ex. {{name: null, beginBirthDate: null, endBirthDate: null, beginMarriageDate: null, endMarriageDate: null}}
         * @params {function} successCallback
         *        The function which will handle the success callback.
         * @params {function} errorCallback
         *      The function which will handle the error callback.
         * @return result The list of all existing contributors.
         * @private
         */
        function _findAll(filter, successCallback, errorCallback) {
            var params = {
                name: filter ? filter.name : null,
                beginDate: filter ? filter.beginDate : null,
                endDate: filter ? filter.endDate : null,
                celebration: filter ? filter.celebration : null
            };
            return resources.findAll(params, null, successCallback, errorCallback);
        }

        /**
         * Search for an existing contributor on the database by its identifier.
         *
         * @params {number} [id]
         *         The identifier of the contributor to be searched.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @return result The found contributor.
         * @private
         */
        function _find(id, successCallback, errorCallback) {
            var params = {
                id: id
            };
            return resources.find(params, null, successCallback, errorCallback);
        }

        return {
            create: _create,
            update: _update,
            remove: _remove,
            find: _find,
            findAll: _findAll
        }
    }
    contributorModule.service('contributorRestService', ['environmentConfig', '$resource', ContributorRestService]);
}());