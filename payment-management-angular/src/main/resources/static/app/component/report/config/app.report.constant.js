import '../app.report.module';

/**
 * @desc Configures the report module.
 * @author William Custodio
 */
(function () {
    'use strict';

    /**
     * Mapper used to map the all the possible report format.
     * @type {*[]}
     */
    const REPORT_FORMAT_CATALOG = [{
        name: 'PDF',
        value: 'PDF',
    }, {
        name: 'ZIP',
        value: 'ZIP'
    }];
    angular.module('paymentManagement.report').constant("REPORT_FORMAT_CATALOG", REPORT_FORMAT_CATALOG);
}());