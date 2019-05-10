import '../app.church.module';

/**
 * @desc Defines the functions used to execute HTTP requests to retrieve or manage the content of a Church.
 * @param $resource The responsible for configuring the api entry points.
 * @author William Custodio
 */
(function () {
    'use strict';

    var module = angular.module('paymentManagement.church');

    function ChurchRestService(environmentConfig, $resource) {

        var resources = $resource(environmentConfig.apiBaseUrl + '/churches/:id', null, {
            'create': {
                method: 'POST'
            },
            'update': {
                method: 'PUT'
            },
            'remove': {
                method: 'DELETE'
            },
            'find': {
                method: 'GET'
            },
            'findAll': {
                method: 'GET'
            }
        });

        /**
         * Create a church.
         *
         * @params {Object} [church]
         *         The church to be persisted.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _create(church, successCallback, errorCallback) {
            return resources.create(null, church, successCallback, errorCallback);
        }

        /**
         * Update an existing church on the database.
         *
         * @params {number} [id]
         *         The identifier of the church to be updated.
         * @params {Object} [church]
         *         The church to be updated.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _update(id, church, successCallback, errorCallback) {
            var params = {
                id: id
            };
            return resources.update(params, church, successCallback, errorCallback);
        }

        /**
         * Delete an existing church from the database.
         *
         * @params {number} [id]
         *         The identifier of the church to be deleted.
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
         * Search for all existing churches on the database.
         *
         * @params {function} [successCallback]
         *        The function which will handle the success callback.
         * @params {function} [errorCallback]
         *      The function which will handle the error callback.
         * @return result The list of all existing churches.
         * @private
         */
        function _findAll(successCallback, errorCallback) {
            return resources.findAll(null, null, successCallback, errorCallback);
        }

        /**
         * Search for an existing church on the database by its identifier.
         *
         * @params {number} [id]
         *         The identifier of the church to be searched.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @return result The found church.
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
    module.service('churchRestService', ['environmentConfig', '$resource', ChurchRestService]);
}());