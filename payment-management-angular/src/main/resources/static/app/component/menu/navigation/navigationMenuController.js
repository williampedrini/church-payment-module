import '../app.menu.module';

import '../../../shared/environment/authentication/authenticationRestService';

/**
 * @desc This Controller is responsible for handling the view 'navigationMenuView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    var paymentManagementModule = angular.module('paymentManagement.menu');

    function NavigationMenuController($scope, $state, $window, environmentConfig, authenticationRestService) {

        var vm = this;

        // Workaround to define the selected menu as active even when its child was selected.
        $scope.$state = $state;

        vm.logoutOnClick = function() {
            authenticationRestService.logout(function() {
                // Redirects to the login page after successfully logout.
                $window.location.href = environmentConfig.loginPageUrl;
            });
        };
    }

    paymentManagementModule.controller('navigationMenuController', [ '$scope', '$state', '$window', 'environmentConfig', 'authenticationRestService', NavigationMenuController]);
}());