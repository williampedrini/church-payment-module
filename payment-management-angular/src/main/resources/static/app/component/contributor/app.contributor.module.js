import 'angular-resource';
import '@uirouter/angularjs';
import 'angular-utils-pagination';

import '../bead/app.bead.module';
import '../modal/app.modal.module';
import '../../shared/form/app.form.module';
import '../breadcrumb/app.breadcrumb.module';

import '../../shared/filter/app.filter.module';
import '../../shared/environment/app.environment.module';
import '../../shared/environment/config/app.environment.constant';
import '../../shared/springIntegration/app.springIntegration.module';

/**
 * @desc Configures the contributor module.
 * @author William Custodio
 */
(function () {
    'use strict';

    angular.module('paymentManagement.contributor', [
        'angularUtils.directives.dirPagination',
        'ui.router',
        'ngResource',
        'paymentManagement.bead',
        'paymentManagement.breadcrumb',
        'paymentManagement.date',
        'paymentManagement.environment',
        'paymentManagement.filter',
        'paymentManagement.form',
        'paymentManagement.modal',
        'paymentManagement.springIntegration'
    ]);
}());