import 'angular-resource';
import '@uirouter/angularjs';
import 'angular-utils-pagination';

import '../breadcrumb/app.breadcrumb.module';

import '../../shared/environment/app.environment.module';
import '../../shared/environment/config/app.environment.constant';
import '../../shared/springIntegration/app.springIntegration.module';

/**
 * @desc Configures the campaign module.
 *    @author William Custodio
 */
(function () {
    'use strict';

    angular.module('paymentManagement.campaign', [
        'angularUtils.directives.dirPagination',
        'ui.router',
        'ngResource',
        'paymentManagement.breadcrumb',
        'paymentManagement.environment',
        'paymentManagement.filter',
        'paymentManagement.springIntegration'
    ]);
}());