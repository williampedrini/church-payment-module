import '../../contribution/app.contribution.module';
import './contributionCalculatorController';

/**
 * @desc This is the definition of a component responsible for handling the contribution calculator component.
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.calculator');

    module.component('contributionCalculator', {
        restrict: 'E',
        controller: 'contributionCalculatorController as vm',
        templateUrl: 'app/component/calculator/contribution/contributionCalculatorView.html',
        bindings: {
            title: '<'
        }
    });
}());