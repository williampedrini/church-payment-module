import '../app.environment.module';

/**
 * @desc Configures the module responsible for holding the environment configuration.
 * @author William Custodio
 */
(function () {
    'use strict';

    var environmentConfig = {
        apiBaseUrl: document.getElementsByTagName("base")[0].href + 'api',
        loginPageUrl: document.getElementsByTagName("base")[0].href + 'login',
        availableLanguages: ['pt_BR']
    };
    angular.module('paymentManagement.environment').constant("environmentConfig", environmentConfig);
}());