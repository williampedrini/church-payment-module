import './app.breadcrumb.module';

/**
 * @desc Configures the breadcrumb used to navigate over the application.
 * @param $breadcrumbProvider The responsible for defining the breadcrumb component configuration.
 * @author William Custodio
 */
(function () {
    'use strict';

    var module = angular.module('paymentManagement.breadcrumb');

    module.config(['$breadcrumbProvider', function ($breadcrumbProvider) {

        // Do not show the abstracts states on the breadcrumb.
        $breadcrumbProvider.setOptions({

            // Should it include abstract states as well?
            includeAbstract: false,

            // A custom template url.
            templateUrl: 'app/component/breadcrumb/breadcrumbView.html'
        });
    }]);
})();