import '../app.springIntegration.module';
import 'sprintf-js';

/**
 * @desc This Controller is responsible for handling the services used to integrate with spring framework.
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.springIntegration');

    function SpringIntegrationService($q, $http, SpringDataRestAdapter) {

        /**
         * Convert all defined properties to a way that spring can read. Ex: '/resource/id'.
         * @param item {{Object}} Item owner of the property to be converted.
         * @param propertiesToConvert {{Array}} List with all the objects tha should be converted. Ex: {name: null, link: null}
         * @param propertiesToRemove {{Array}} List with all properties to be removed from the mapping.
         * @private
         */
        function _convertProperty(item, propertiesToConvert, propertiesToRemove) {
            _removeProperty(item, propertiesToRemove);
            _convertProperties(item, propertiesToConvert);
        }

        /**
         * Build all the properties from an item in a way that spring rest can read.
         * @param item The item owner of the properties to be converted.
         * @param propertiesToConvert The properties to convert.
         * @private
         */
        function _convertProperties(item, propertiesToConvert) {
            angular.forEach(item, function(property, propertyName) {
                var propertyToConvert = propertiesToConvert.filter(function(property) {
                    return property.name === propertyName;
                });
                if(_canConvertProperty(propertiesToConvert, propertyName, property)) {
                    item[propertyName] = Array.isArray(property) ? _convertItems(property, propertyToConvert[0])
                        : _convertItem(property, propertyToConvert[0]);
                }
            });
        }

        /**
         * Remove all the properties that will not be sent to the server.
         * @param item The item owner of the property to be removed.
         * @param propertiesToRemove The array of all properties to be removed from the item.
         * @private
         */
        function _removeProperty(item, propertiesToRemove) {
            if(Array.isArray(propertiesToRemove)) {
                propertiesToRemove.forEach(function(property) {
                    delete item[property];
                });
            }
        }

        /**
         * Convert all items from an array of properties into a way that spring rest can read.
         * @param property The array os properties to be converted.
         * @param propertyToConvert The object containing the information with the link of the resource.
         * @returns {*} The representation as a resource links.
         * @private
         */
        function _convertItems(property, propertyToConvert) {
            return property.map(function(propertyItem) {
                return _convertItem(propertyItem, propertyToConvert);
            });
        }

        /**
         * Convert a certain item into a property that spring rest can read.
         * @param property The property to be converted.
         * @param propertyToConvert The object containing the information with the link of the resource.
         * @returns {*} The representation as a resource link.
         * @private
         */
        function _convertItem(property, propertyToConvert) {
            return vsprintf(propertyToConvert.link, [property.id]);
        }

        /**
         * Verifies if the property can be converted.
         * @param propertiesToConvert The array with all the possible properties that can be converted.
         * @param propertyName The name of the property to be validated.
         * @param property The property to be validated.
         * @return {{boolean}} <code>true: <code> The property can be converted. </br>
         *                     <code>false: <code> The property cannot be converted.
         * @private
         */
        function _canConvertProperty(propertiesToConvert, propertyName, property) {
            return _.includes(JSON.stringify(propertiesToConvert), vsprintf(':"%s"', propertyName)) && property;
        }

        /**
         * Process all the links associated to the items.
         * @param items The array with all the items owner of the links.
         * @param linksToFetch The array used to define which links should be fetched.
         * @returns {*} All the processed promises.
         * @private
         */
        function _retrieveDataFromItemsLinks(items, linksToFetch) {

            var promises = [];

            // Create a http @GET promise for each link of each item.
            items.forEach(function(item) {
                promises = promises.concat(_retrieveDataFromItemLinks(item, linksToFetch));
            });

            return $q.all(promises);
        }

        /**
         * Process all the links associated to a certain item.
         * @param item The item to be processed owner of the links.
         * @param linksToFetch The array used to define which links should be fetched.
         * @returns {*} The array with all the promises to be processed.
         * @private
         */
        function _retrieveDataFromItemLinks(item, linksToFetch) {

            var promises = [];

            /*
             * Process all the links and create a http @GET promise
             * for each link which name matches the links defined in the 'linksToFetch' array.
             */
            angular.forEach(item._links, function(link, name) {
                // Fetch only the links that were defined.
                if(_.includes(linksToFetch, name)) {
                    promises.push(_buildHttpPromiseFromLink(link.href, function(result) {
                        item[name] = result;
                    }));
                }
            });

            return $q.all(promises);
        }

        /**
         * Build a http @GET promise from a link.
         * @param link The link to be used to retrieve data from the server.
         * @param successCallback The success callback function used to handle the success scenario.
         * @returns {*} The built promise
         * @private
         */
        function _buildHttpPromiseFromLink(link, successCallback) {
            return SpringDataRestAdapter.process($http.get(link)).then(successCallback);
        }

        return {
            convertProperty: _convertProperty,
            retrieveDataFromItemsLinks: _retrieveDataFromItemsLinks,
            retrieveDataFromItemLinks: _retrieveDataFromItemLinks
        }
    }
    module.service('springIntegrationService', [
        '$q',
        '$http',
        'SpringDataRestAdapter',
        SpringIntegrationService
    ]);
}());