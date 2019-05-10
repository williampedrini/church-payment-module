import 'angular';
import 'angular-animate';
import 'angular-sanitize';

import 'bootstrap';
import '../assets/sass/index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

/**
 * @description Configures the entire applications.
 * @author William Custodio
 */
(function () {
    'use strict';

    /* Import for all existing component. */
    const componentRequiredFiles = require.context("./component", true, /^(.*\.(js$))[^.]*$/igm);
    componentRequiredFiles.keys().forEach(componentRequiredFiles);
    /* Import for configuration modules. */
    const sharedRequiredFiles = require.context("./shared", true, /^(.*\.(js$))[^.]*$/igm);
    sharedRequiredFiles.keys().forEach(sharedRequiredFiles);

    angular.module('paymentManagement', [
        'paymentManagement.bead',
        'paymentManagement.breadcrumb',
        'paymentManagement.campaign',
        'paymentManagement.calculator',
        'paymentManagement.church',
        'paymentManagement.contribution',
        'paymentManagement.contributor',
        'paymentManagement.home',
        'paymentManagement.provingType',
        'paymentManagement.environment',
        'paymentManagement.menu',
        'paymentManagement.message',
        'paymentManagement.date',
        'paymentManagement.report'
    ]);
})();