import '../app.provingType.module';

/**
 * @desc Configures the proving type module.
 * @author William Custodio
 */
(function () {
    'use strict';

    /**
     * Mapper used to map the all the possible proving types.
     * @type {*[]}
     */
    const PROVING_TYPE_CATALOG = [{
        name: 'TALÃO',
        value: 'TLO',
    }, {
        name: 'SEM COMPROVANTE',
        vale: 'SCT'
    }];
    angular.module('paymentManagement.provingType').constant("PROVING_TYPE_CATALOG", PROVING_TYPE_CATALOG);
}());