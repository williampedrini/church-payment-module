import '../app.environment.module';
import '../../../component/home/app.home.route';

/**
 * @desc Configures the routes used to navigate over the application.
 * @param $stateProvider The responsible for defining the routes.
 * @param $urlRouterProvider The responsible for defining the default path.
 * @author William Custodio
 */
(function () {
    'use strict';

    var environmentModule = angular.module('paymentManagement.environment');

    environmentModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/pages/home');

        $locationProvider.html5Mode(true);

        $stateProvider.state('application', {
            url: '/pages',
            abstract: true,
            template: '<ui-view/>'
        })
    }]);
})();