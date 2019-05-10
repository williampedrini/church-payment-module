import './app.home.module';
import './homeController';

/**
 * @desc Configures the home routes.
 * @param $stateProvider The responsible for defining the routes.
 * @author William Custodio
 */
(function () {
    'use strict';

    var module = angular.module('paymentManagement.contributor');

    module.config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('application.home', {
            url: '/home',
            templateUrl: 'app/component/home/homeView.html',
            controller: 'homeController as vm',
            breadcrumb: {
                label: 'application.home.label.title',
                force: true
            }
        })
    }]);
}());