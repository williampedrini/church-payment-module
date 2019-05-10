import '../app.environment.module';
import '../config/app.environment.constant';

import './locale/locale-pt_BR.json'

/**
 * @desc Configures the existing translation used to navigate over the application.
 * @param $translateProvider The responsible for defining the translations.
 * @param $qProvider The responsible for handling rejections.
 * @param environmentConfig The owner of the application's environment variables.
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.environment');

    module.config(['$translateProvider', '$qProvider', 'environmentConfig', function ($translateProvider, $qProvider, environmentConfig) {

        $qProvider.errorOnUnhandledRejections(false);

        $translateProvider.useStaticFilesLoader({
            prefix: 'build/locale/locale-',
            suffix: '.json'
        });
        $translateProvider.registerAvailableLanguageKeys(environmentConfig.availableLanguages, {
            'pt*': 'pt_BR',
            'en*': 'pt_BR'
        });
        $translateProvider.use('pt_BR');
        // Get the user's system language
        $translateProvider.determinePreferredLanguage();
        // If their system uses a lang we don't support, fall back to this lang
        $translateProvider.fallbackLanguage('pt_BR');
        // Defines the default language.
        $translateProvider.preferredLanguage('pt_BR');
        // Store the user's lang preference
        $translateProvider.useCookieStorage();
        // Prevent hacking of interpoloated strings
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    }]);
})();