import '../app.contribution.module';
import './contributionCatalogController';

/**
 * @desc This is the definition of a component responsible for handling the contribution catalog component.
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.contribution');

    module.component('contributionCatalog', {
        restrict: 'E',
        controller: 'contributionCatalogController as vm',
        templateUrl: 'app/component/contribution/catalog/contributionCatalogView.html',
        bindings: {
            title: '<',
            size: '<',
            sort: '<',
            readOnly: '<'
        }
    });
}());