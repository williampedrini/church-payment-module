import '../app.bead.module';
import './beadCatalogController';

/**
 * @desc This is the definition of a component responsible for handling the bead catalog component.
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.bead');

    module.component('beadCatalog', {
        restrict: 'E',
        controller: 'beadCatalogController as vm',
        templateUrl: 'app/component/bead/catalog/beadCatalogView.html',
        bindings: {
            contributor: '<',
            beads: '='
        }
    });
}());