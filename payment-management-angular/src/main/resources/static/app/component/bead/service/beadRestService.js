import '../app.bead.module';

/**
 * @desc Defines the functions used to execute HTTP requests to retrieve or manage the content of a Bead.
 * @param $resource The responsible for configuring the api entry points.
 * @author William Custodio
 */
(function () {
    'use strict';

    var module = angular.module('paymentManagement.bead');

    function BeadRestService(environmentConfig, $resource) {

        var resources = $resource(environmentConfig.apiBaseUrl + '/beads/:id/:action/:subAction', null, {
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
                method: 'GET'
            },
            'findByCampaignIdAndContributorId': {
                method: 'GET',
                params: {
                    'action': 'search',
                    'subAction': 'findByCampaign_IdAndContributor_Id',
                    'campaignId': '@campaignId',
                    'contributorId': '@contributorId'
                }
            },
            'findByIdentificationNumberAndCampaignId': {
                method: 'GET',
                params: {
                    'action': 'search',
                    'subAction': 'findByIdentificationNumberAndCampaign_Id',
                    'identificationNumber': '@identificationNumber',
                    'campaignId': '@campaignId'
                }
            }
        });

        /**
         * Create a bead.
         *
         * @params {Object} [bead]
         *         The bead to be persisted.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _create(bead, successCallback, errorCallback) {
            return resources.create(null, bead, successCallback, errorCallback);
        }

        /**
         * Update an existing bead on the database.
         *
         * @params {number} [id]
         *         The identifier of the bead to be updated.
         * @params {Object} [bead]
         *         The bead to be updated.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _update(id, bead, successCallback, errorCallback) {
            var params = {
                id: id
            };
            return resources.update(params, bead, successCallback, errorCallback);
        }

        /**
         * Delete an existing bead from the database.
         *
         * @params {number} [id]
         *         The identifier of the bead to be deleted.
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
         * Search for all existing beads on the database.
         *
         * @params {function} [successCallback]
         *        The function which will handle the success callback.
         * @params {function} [errorCallback]
         *      The function which will handle the error callback.
         * @return result The list of all existing beads.
         * @private
         */
        function _findAll(successCallback, errorCallback) {
            return resources.findAll(null, null, successCallback, errorCallback);
        }

        /**
         * Search for an existing bead on the database by its identifier.
         *
         * @params {number} [id]
         *         The identifier of the bead to be searched.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @return result The found bead.
         * @private
         */
        function _find(id, successCallback, errorCallback) {
            var params = {
                id: id
            };
            return resources.find(params, null, successCallback, errorCallback);
        }

        /**
         * Search for a specific beads on the database that is associated to a certain campaign and contributor.
         *
         * @params {number} [campaignId]
         *         The campaign's identifier.
         * @params {number} [contributorId]
         *         The contributor's identifier.
         * @params {function} [successCallback]
         *        The function which will handle the success callback.
         * @params {function} [errorCallback]
         *      The function which will handle the error callback.
         * @return result The found bead.
         * @private
         */
        function _findByCampaignIdAndContributorId(campaignId, contributorId, successCallback, errorCallback) {
            var params = {
                campaignId: campaignId,
                contributorId: contributorId
            };
            return resources.findByCampaignIdAndContributorId(params, null, successCallback, errorCallback);
        }

        /**
         * Search for a specific beads on the database that is associated to a certain campaign and contributor.
         *
         * @params {number} [identificationNumber]
         *         The bead's custom identifier.
         * @params {number} [campaignId]
         *         The campaign's identifier.
         * @params {function} [successCallback]
         *        The function which will handle the success callback.
         * @params {function} [errorCallback]
         *      The function which will handle the error callback.
         * @return result The found bead.
         * @private
         */
        function _findByIdentificationNumberAndCampaignId(identificationNumber, campaignId, successCallback, errorCallback) {
            var params = {
                identificationNumber: identificationNumber,
                campaignId: campaignId
            };
            return resources.findByIdentificationNumberAndCampaignId(params, null, successCallback, errorCallback);
        }

        return {
            create: _create,
            update: _update,
            remove: _remove,
            find: _find,
            findAll: _findAll,
            findByCampaignIdAndContributorId: _findByCampaignIdAndContributorId,
            findByIdentificationNumberAndCampaignId: _findByIdentificationNumberAndCampaignId
        }
    }
    module.service('beadRestService', ['environmentConfig', '$resource', BeadRestService]);
}());