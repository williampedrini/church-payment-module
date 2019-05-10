import '../app.form.module';

/**
 * @desc This Controller is responsible for handling the validation services for all form.
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.form');

    function FormValidatorService() {

        /**
         * Verifies if a certain field of the form contains error or not.
         * @param form {{Object}} The form to be validated.
         * @param field {{Object}} The field name to be validated.
         * @param validation {{String}} The type of the validation to be performed.
         * @returns {boolean}
         */
        function _hasError(form, field, validation) {
            return (form.$submitted && form[field].$error[validation]);
        }

        return {
            hasError : _hasError
        }
    }
    module.service('formValidatorService', [
        FormValidatorService
    ]);
}());