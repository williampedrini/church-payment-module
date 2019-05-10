import 'angular-resource';

import '../../shared/environment/app.environment.module';
import '../../shared/environment/config/app.environment.constant';

/**
 * @desc Configures the calculator module.
 * @author William Custodio
 */
(function () {
    'use strict';

    angular.module('paymentManagement.calculator', [
        'ngResource',
        'paymentManagement.environment'
    ]);
}());