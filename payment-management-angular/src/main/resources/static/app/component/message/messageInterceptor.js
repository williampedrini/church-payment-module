import './app.message.module';
import './messageService';

/**
 * @desc This interceptor is responsible for handling the view 'messageView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    function MessageConfig($httpProvider) {

        function MessageInterceptor(messageService) {
            return {
                'requestError': function(response) {
                    messageService.cleanMessages();
                    messageService.mapMessagesFromResponse(response);
                },
                'responseError': function(response) {
                    messageService.cleanMessages();
                    messageService.mapMessagesFromResponse(response);
                }
            };
        }
        $httpProvider.interceptors.push(['messageService', MessageInterceptor]);
    }
    angular.module('paymentManagement.message').config(['$httpProvider', MessageConfig]);
}());