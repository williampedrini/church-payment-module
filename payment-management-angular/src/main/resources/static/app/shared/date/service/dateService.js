import '../app.date.module';

/**
 * @desc This Controller is responsible for handling the services for all date inputs.
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.date');

    function ConfirmationModalService() {

        const _dateRegEx = /^\d{4}-\d{2}-\d{2}$/;

        /**
         * Convert all the dates inside an object.
         * @param object The object owner of the dates.
         * @private
         */
        function _convertDates(input) {
            if (!angular.isObject(input)) {
                return input;
            }
            angular.forEach(input, function (value, key) {
                if (_isDate(value)) {
                    input[key] = new Date(value);
                } else if (angular.isObject(value)) {
                    _convertDates(value);
                }
            });
        }

        /**
         * Convert all the params which are dates into string using the pattern 'yyyy-MM-dd'.
         * @param params The query parameters to be converted.
         * @private
         */
        function _convertParamDates(params) {
            for(var key in params) {
                if(params[key] instanceof Date) {
                    params[key] = _format(params[key]);
                }
            }
        }

        /**
         * Format a certain date into the pattern 'yyyy-MM-dd'.
         * @param date The date to be converted.
         * @returns {string} The converted date in the specific format.
         * @private
         */
        function _format(date) {
            var newDate = new Date(date),
            month = '' + (newDate.getMonth() + 1),
            day = '' + newDate.getDate(),
            year = newDate.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [year, month, day].join('-');
        }

        /**
         * Verifies if the string is a date.
         * @param value The value to be validated.
         * @returns {boolean}
         * @private
         */
        function _isDate(value) {
            return angular.isString(value) && _dateRegEx.test(value);
        }

        return {
            format: _format,
            convertDates : _convertDates,
            convertParamDates: _convertParamDates
        }
    }
    module.service('dateService', [
        ConfirmationModalService
    ]);
}());