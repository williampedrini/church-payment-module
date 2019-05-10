import './app.message.module';

/**
 * @desc Configures the module responsible for holding the message service constants.
 * @author William Custodio
 */
(function () {
    'use strict';

    /**
     * Catalog used to map the possible css class by each message type.
     * @type {{SUCCESS: string, INFO: string, WARN: string, ERROR: string}}
     */
    const CSS_CLASS_CATALOG = {
        'SUCCESS': 'alert alert-success',
        'INFO': 'alert alert-info',
        'WARNING': 'alert alert-warning',
        'ERROR': 'alert alert-danger'
    };
    angular.module('paymentManagement.message').constant("CSS_CLASS_CATALOG", CSS_CLASS_CATALOG);

    /**
     * Catalog used to map all the possible message types.
     * @type {{SUCCESS: string, WARNING: string, INFO: string, ERROR: string}}
     */
    const TYPE_CATALOG = {
        'WARNING': 'WARNING',
        'INFO': 'INFO',
        'ERROR': 'ERROR',
        'SUCCESS': 'SUCCESS'
    };
    angular.module('paymentManagement.message').constant("TYPE_CATALOG", TYPE_CATALOG);
}());