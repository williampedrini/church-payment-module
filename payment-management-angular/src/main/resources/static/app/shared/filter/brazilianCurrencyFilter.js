/**
 * @desc Configures the filter for brazilian currency.
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.filter');

    function BrazilianCurrencyFilter($filter) {

        return function(amount, symbol, precision, isCents){

            symbol = symbol ? [symbol,''].join(' ') : '';

            precision = precision ? precision : 2;

            amount = isCents ? amount / 100 : amount;
            amount = $filter('currency')(amount, symbol, precision);

            return amount
                .replace(/\./g,'DECIMAL')
                .replace(/,/g,',')
                .replace(/DECIMAL/g,'.');
        };
    }
    module.filter('brazilianCurrency', ['$filter', BrazilianCurrencyFilter]);
}());