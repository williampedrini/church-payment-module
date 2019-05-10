import '../app.environment.module';
import '../config/app.environment.constant';

/**
 * @desc Defines the functions used to execute HTTP requests for the authentication module.
 * @param $resource The responsible for configuring the api entry points.
 * @author William Custodio
 */
(function () {
    'use strict';

    var environmentModule = angular.module('paymentManagement.environment');

    function AuthenticationRestService(environmentConfig, $resource){

        var resources = $resource(environmentConfig.apiBaseUrl + '/:action', null, {
            'login': {
                method: 'GET',
                params: {
                    action: '@action'
                }
            },
            'logout': {
                method: 'GET',
                params: {
                    action: '@action'
                }
            }
        });

        /**
         * Performs the login action.
         * @params {function} [successCallback]
         *        The function which will handle the success callback.
         * @params {function} [errorCallback]
         *      The function which will handle the error callback.
         * @returns {*|{method}} Successful login.
         * @private
         */
        function _login(successCallback, errorCallback) {
            var params = {
                action: "login"
            };
            return resources.login(params, null, successCallback, errorCallback);
        }

        /**
         * Performs the logout action.
         * @params {function} [successCallback]
         *        The function which will handle the success callback.
         * @params {function} [errorCallback]
         *      The function which will handle the error callback.
         * @returns {*|{method}} Successful logout.
         * @private
         */
        function _logout(successCallback, errorCallback) {
            var params = {
                action: "logout"
            };
            return resources.logout(params, null, successCallback, errorCallback);
        }

        return {
            login: _login,
            logout: _logout
        }
    }

    environmentModule.service('authenticationRestService', ['environmentConfig', '$resource', AuthenticationRestService]);
}());