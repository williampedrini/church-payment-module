import './app.home.module';

/**
 * @desc This Controller is responsible for handling the view 'homeView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const homeModule = angular.module('paymentManagement.home');

    function HomeController(){

        var vm = this;

        /**
         * Defines the configuration used when displayed the result from the contribution's component.
         * @type {{title: string, size: number, sort: string, readOnly: boolean}}
         */
        vm.contributionComponentConfig = {
            title: 'application.home.table.contribution.catalog.title',
            size: 10,
            sort: 'creationDate,desc',
            readOnly: true
        };

        /**
         * Defines the configuration used when displayed the result from the contributor's component.
         * @type {{title: string, size: number, sort: string, readOnly: boolean}}
         */
        vm.contributorComponentConfig = {
            title: 'application.home.table.contributor.title',
            size: 10,
            sort: 'creationDate,desc',
            readOnly: true
        };

        /**
         * Defines the configuration used when displayed the result from the contributor calculator's component.
         * @type {{title: string}}
         */
        vm.contributionCalculatorComponentConfig = {
            title: 'application.home.table.contribution.calculator.title'
        };
    }

    homeModule.controller('homeController', [
        HomeController
    ]);
}());