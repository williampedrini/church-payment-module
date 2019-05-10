import '../app.provingType.module';

/**
 * @desc Defines the functions used to execute HTTP requests to retrieve or manage the content of a proving type.
 * @param $resource The responsible for configuring the api entrypoints.
 * @author William Custodio
 */
(function () {
    'use strict';

    var module = angular.module('paymentManagement.provingType');

    function ProvingTypeRestService(environmentConfig, $resource){

        var resources = $resource(environmentConfig.apiBaseUrl + '/provingTypes/:id', null, {
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
         * Create a proving type.
         *
         * @params {Object} [provingType]
         *         The proving type to be persisted.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _create(provingType, successCallback, errorCallback) {
            return resources.create(null, provingType, successCallback, errorCallback);
        }

        /**
         * Update an existing proving type on the database.
         *
         * @params {number} [id]
         *         The identifier of the provingType to be updated.
         * @params {Object} [provingType]
         *         The proving type to be updated.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _update(id, provingType, successCallback, errorCallback) {
            var params = {
                id: id
            };
            return resources.update(params, provingType, successCallback, errorCallback);
        }

        /**
         * Delete an existing proving type from the database.
         *
         * @params {number} [id]
         *         The identifier of the proving type to be deleted.
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
         * Search for all existing proving types on the database.
         *
         * @params {function} [successCallback]
         *        The function which will handle the success callback.
         * @params {function} [errorCallback]
         *      The function which will handle the error callback.
         * @return result The list of all existing proving types.
         * @private
         */
        function _findAll(successCallback, errorCallback) {
            return resources.findAll(null, null, successCallback, errorCallback);
        }

        /**
         * Search for an existing proving type on the database by its identifier.
         *
         * @params {number} [id]
         *         The identifier of the provingType to be searched.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @return result The found provingType.
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
    module.service('provingTypeRestService', ['environmentConfig', '$resource', ProvingTypeRestService]);
}());