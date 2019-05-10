import '../app.campaign.module';

/**
 * @desc Defines the functions used to execute HTTP requests to retrieve or manage the content of a Campaign.
 * @param $resource The responsible for configuring the api entry points.
 * @author William Custodio
 */
(function () {
    'use strict';

    const campaignModule = angular.module('paymentManagement.campaign');

    function CampaignRestService(environmentConfig, $resource) {

        const resources = $resource(environmentConfig.apiBaseUrl + '/campaigns/:id/:action/:subAction', null, {
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
                    name: '@name'
                }
            },
            'findAllByProvingType': {
                method: 'GET',
                params: {
                    'action': 'search',
                    'subAction': 'findAllByProvingType',
                    'provingType': '@provingType'
                }
            }
        });

        /**
         * Create a campaign.
         *
         * @params {Object} [campaign]
         *         The campaign to be persisted.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _create(campaign, successCallback, errorCallback) {
            return resources.create(null, campaign, successCallback, errorCallback);
        }

        /**
         * Update an existing campaign on the database.
         *
         * @params {number} [id]
         *         The identifier of the campaign to be updated.
         * @params {Object} [campaign]
         *         The campaign to be updated.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @private
         */
        function _update(id, campaign, successCallback, errorCallback) {
            var params = {
                id: id
            };
            return resources.update(params, campaign, successCallback, errorCallback);
        }

        /**
         * Delete an existing campaign from the database.
         *
         * @params {number} [id]
         *         The identifier of the campaign to be deleted.
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
         * Search for all existing campaigns on the database.
         *
         * @param {Object} [filter] The filter to be used for the filtering action. Ex. {{name: null}}
         * @params {function} [successCallback]
         *        The function which will handle the success callback.
         * @params {function} [errorCallback]
         *      The function which will handle the error callback.
         * @return result The list of all existing campaigns.
         * @private
         */
        function _findAll(filter, successCallback, errorCallback) {
            var params = {
                name: filter ? filter.name : null
            };
            return resources.findAll(params, null, successCallback, errorCallback);
        }

        /**
         * Search for all existing beads on the database that has a certain proving type.
         *
         * @params {string} [provingType]
         *         The proving type mnemonic. Ex: TLO - Talão.
         * @params {function} [successCallback]
         *        The function which will handle the success callback.
         * @params {function} [errorCallback]
         *      The function which will handle the error callback.
         * @return result The list of all existing beads.
         * @private
         */
        function _findAllByProvingType(provingType, successCallback, errorCallback) {
            var params = {
                provingType: provingType
            };
            return resources.findAllByProvingType(params, null, successCallback, errorCallback);
        }

        /**
         * Search for an existing campaign on the database by its identifier.
         *
         * @params {number} [id]
         *         The identifier of the campaign to be searched.
         * @params {function} [successCallback]
         *         The function which will handle the success callback.
         * @params {function} [errorCallback]
         *         The function which will handle the error callback.
         * @return result The found campaign.
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
            findAll: _findAll,
            findAllByProvingType: _findAllByProvingType
        }
    }
    campaignModule.service('campaignRestService', ['environmentConfig', '$resource', CampaignRestService]);
}());