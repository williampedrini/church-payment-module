
import 'angular-resource';

import '../../shared/environment/app.environment.module';
import '../../shared/environment/config/app.environment.constant';

/**
 * @desc Configures the existing application's modules.
 *    @authour William Custodio
 */
(function () {
    'use strict';

    angular.module('paymentManagement.church', [
        'ngResource',
        'paymentManagement.environment'
    ]);
}());