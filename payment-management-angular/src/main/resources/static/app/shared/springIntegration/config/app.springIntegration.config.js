import '../app.springIntegration.module';

/**
 * @desc Configures the module responsible for holding the spring integration configuration.
 * @author William Custodio
 */
(function () {
    'use strict';

    function SpringIntegrationConfig(SpringDataRestInterceptorProvider) {
        SpringDataRestInterceptorProvider.apply();
    }
    angular.module('paymentManagement.springIntegration').config(['SpringDataRestInterceptorProvider', SpringIntegrationConfig]);
}());