import 'angular-resource';
import 'angular-money-mask';
import '@uirouter/angularjs';
import 'angular-utils-pagination';

import '../breadcrumb/app.breadcrumb.module';

import '../../shared/environment/app.environment.module';
import '../../shared/environment/config/app.environment.constant';
import '../../shared/springIntegration/app.springIntegration.module';

/**
 * @desc Configures the contribution module.
 * @author William Custodio
 */
(function () {
    'use strict';

    angular.module('paymentManagement.contribution', [
        'angularUtils.directives.dirPagination',
        'ui.router',
        'ngResource',
        'rw.moneymask',
        'paymentManagement.breadcrumb',
        'paymentManagement.environment',
        'paymentManagement.filter',
        'paymentManagement.springIntegration'
    ]);
}());