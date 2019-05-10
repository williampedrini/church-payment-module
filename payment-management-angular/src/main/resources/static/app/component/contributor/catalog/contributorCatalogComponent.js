import '../app.contributor.module';
import './contributorCatalogController';

/**
 * @desc This is the definition of a component responsible for handling the contributor catalog component.
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.contributor');

    module.component('contributorCatalog', {
        restrict: 'E',
        controller: 'contributorCatalogController as vm',
        templateUrl: 'app/component/contributor/catalog/contributorCatalogView.html',
        bindings: {
            title: '<',
            size: '<',
            sort: '<',
            readOnly: '<'
        }
    });
}());