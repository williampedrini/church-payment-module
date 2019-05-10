import './app.contributor.module';
import './catalog/contributorCatalogController';
import './register/contributorRegisterController';

/**
 * @desc Configures the contributor routes.
 * @param $stateProvider The responsible for defining the routes.
 * @author William Custodio
 */
(function () {
    'use strict';

    var module = angular.module('paymentManagement.contributor');

    module.config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('application.contributor', {
            url: '/contributors',
            component: 'contributorCatalog',
            breadcrumb: {
                label: 'application.contributor.catalog.label.title',
                force: true,
                stateOptions: {
                    reload: true
                }
            }
        })
        .state('application.contributor.register', {
            url: '/:idContributor',
            templateUrl: 'app/component/contributor/register/contributorRegisterView.html',
            controller: 'contributorRegisterController as vm',
            params: {
                idContributor: null
            },
            breadcrumb: {
                label: 'application.contributor.register.label.title',
                force: true
            }
        })
    }]);
}());