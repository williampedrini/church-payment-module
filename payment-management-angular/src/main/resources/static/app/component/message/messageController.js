import './app.message.module';
import './messageService';

/**
 * @desc This Controller is responsible for handling the view 'messageView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.message');

    function MessageController($timeout, messageService) {

        const vm = this;

        // Initialize all the messages.
        vm.messages = messageService.getMessages();

        /**
         * Map the message's type into a specific css class.
         * @param type The type of the message. Ex: INFO, WARN or ERROR.
         * @return Returns the message class according to the message type.
         */
        vm.getClassByMessageType = function(type) {
           return messageService.getClassByType(type);
        };

        /**
         * Verifies if the message will be shown to the user or not.
         * @returns {boolean} <code>true</code>: if the message will be shown. </br>
         *                    <code>false</code>: if the message will not be shown.
         */
        vm.showMessages = function() {
            // Hide all after 3 seconds.
            $timeout(function(){ messageService.cleanMessages() }, 6000);
            return vm.messages.length > 0;
        };
    }
    module.controller('messageController', ['$timeout', 'messageService', MessageController]);
}());