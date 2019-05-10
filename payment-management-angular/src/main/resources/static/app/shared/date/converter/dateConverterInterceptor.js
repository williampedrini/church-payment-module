import '../app.date.module';
import '../service/dateService';

/**
 * @desc This interceptor is responsible for intercepting all the response
 * from the server and converting all the possible dates to object date.
 * @author William Custodio
 */
(function () {
    'use strict';

    function DateConverterConfig($httpProvider) {

        function DateConverterInterceptor(dateService) {
            return {
                'request': function(config) {
                    dateService.convertParamDates(config.params);
                    dateService.convertParamDates(config.data);
                    return config;
                },
                'response': function(response) {
                    dateService.convertDates(response.data);
                    return response;
                }
            };
        }
        $httpProvider.interceptors.push(['dateService', DateConverterInterceptor]);
    }
    angular.module('paymentManagement.date').config(['$httpProvider', DateConverterConfig]);
}());