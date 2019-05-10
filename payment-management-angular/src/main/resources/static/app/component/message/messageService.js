import './app.message.module'

/**
 * @desc This service is responsible for performing actions over the messages to be shown to a user.
 * @author William Custodio
 */
(function () {
    'use strict';

    var module = angular.module('paymentManagement.message');

    function MessageService(CSS_CLASS_CATALOG, TYPE_CATALOG) {

        /**
         * The template of a possible message.
         * @type {{key: null, message: null, type: string, timeout: *}}
         */
        var _message = {
            key: null,
            message: null,
            type: TYPE_CATALOG['SUCCESS']
        };

        var _messages = [];

        /**
         * Add a specific message to the array of messages.
         * @param message {Object} The JSON that represents the message to be added. Ex: {key: null, type: null}.
         * @private
         */
        function _addMessage(message){
            _messages.push(message);
        }

        /**
         * Clean all the messages from the array of messages.
         * @private
         */
        function _cleanMessages() {
            _messages.splice(0, _messages.length);
        }

        /**
         * Clean all the error messages from the array of messages.
         * @private
         */
        function _cleanErrorMessages() {
            _messages = _messages.filter(function(message) {
                if(message.type !== TYPE_CATALOG['ERROR']) {
                    return message;
                }
            });
        }

        /**
         * Map the message's type into a specific css class.
         * @param type The type of the message. Ex: INFO, WARN or ERROR.
         */
        function _getClassByType(type) {
            return type ? CSS_CLASS_CATALOG[type] : CSS_CLASS_CATALOG['DEFAULT'];
        }

        /**
         * Get a copy of the existing messages array.
         * @returns {*} The copy with all messages in the array.
         * @private
         */
        function _getMessages() {
            return _messages;
        }

        /**
         * Get a copy of the template.
         * @returns {*} The copy of the template of message.
         * @private
         */
        function _getMessageTemplate() {
            return angular.copy(_message);
        }

        /**
         * Map all the messages that where provided by the response.
         * @param response The object that represents the response.
         * @private
         */
        function _mapMessagesFromResponse(response) {
            if(response.data) {
                var messages = response.data.messages;
                for(var index=0; index < messages.length; index++) {
                    _messages.push(messages[index]);
                }
            }
        }

        /**
         * Show a success message according to a certain key of translation.
         * @param key The key used by the angular translator.
         * @private
         */
        function _showSuccessMessage(key) {
            _showMessage(key, 'SUCCESS');
        }

        /**
         * Show a warning message according to a certain key of translation.
         * @param key The key used by the angular translator.
         * @private
         */
        function _showWarningMessage(key) {
            _showMessage(key, 'WARNING');
        }

        /**
         * Show an error message according to a certain key of translation.
         * @param key The key used by the angular translator.
         * @private
         */
        function _showErrorMessage(key) {
            _showMessage(key, 'ERROR');
        }

        /**
         * Show a specific message for the user.
         * @param key The key used by the translation.
         * @param type The type used to define the css class.
         * @private
         */
        function _showMessage(key, type) {

            // Clean all the existing messages.
            _cleanMessages();

            // Build a message.
            var message = angular.copy(_message);
            message.key = key;
            message.type = TYPE_CATALOG[type];

            _messages.push(message);
        }

        return {
            addMessage: _addMessage,
            cleanMessages: _cleanMessages,
            cleanErrorMessages: _cleanErrorMessages,
            getClassByType: _getClassByType,
            getMessages: _getMessages,
            getMessageTemplate: _getMessageTemplate,
            mapMessagesFromResponse: _mapMessagesFromResponse,
            showSuccessMessage: _showSuccessMessage,
            showErrorMessage: _showErrorMessage,
            showWarningMessage: _showWarningMessage
        };
    }

    module.service('messageService', ['CSS_CLASS_CATALOG', 'TYPE_CATALOG', MessageService]);
}());