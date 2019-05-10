/* Components dependencies */
import './app.contribution.module';
import './catalog/contributionCatalogController';

/**
 * @desc Configures the contribution routes.
 * @param $stateProvider The responsible for defining the routes.
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.contribution');

    module.config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('application.contribution', {
            url: '/contributions',
            component: 'contributionCatalog',
            breadcrumb: {
                label: 'application.contribution.catalog.label.title',
                force: true,
                stateOptions: {
                    reload: true
                }
            }
        }).state('application.contribution.register', {
            url: '/:idContribution',
            templateUrl: 'app/component/contribution/register/contributionRegisterView.html',
            controller: 'contributionRegisterController as vm',
            params: {
                idContribution: null
            },
            breadcrumb: {
                label: 'application.contribution.register.label.title',
                force: true,
                stateOptions: {
                    reload: true
                }
            }
        })
    }]);
}());