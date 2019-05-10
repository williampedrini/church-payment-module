import 'lodash';

import '../app.contributor.module';
import '../../message/messageService';
import '../service/contributorRestService';
import '../config/app.contributor.constant';

import '../../../shared/form/validator/formValidatorService';

/**
 * @desc This Controller is responsible for handling the view 'contributionRegisterView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.contributor');

    function ContributorRegisterController($scope, $state, $stateParams, messageService, formValidatorService,
                                           contributorRestService, springIntegrationService,
                                           GENDER_CATALOG, CIVIL_STATE_CATALOG, CONTRIBUTOR_LINK_PROPERTY_MAPPER) {
        const vm = this;

        /**
         * The contributor to be edited/created.
         * @type {{Object}}
         */
        vm.contributor = {
            id: null,
            name: null,
            fiscalNumber: null,
            gender: null,
            civilState: null,
            address: null,
            birthDate: null,
            creationDate: new Date(),
            marriageDate: null,
            partnerName: null,
            telephone: null,
            cellphone: null,
            contributions: [],
            beads: []
        };

        /**
         * Catalog with all existing genders for a contributor.
         */
        vm.genders = GENDER_CATALOG;

        /**
         * Catalog with all existing civil states.
         */
        vm.civilStates = CIVIL_STATE_CATALOG;

        /**
         * Function responsible for handling the hook for the initialization of the controller.
         */
        vm.onInit = function() {
            if($stateParams.idContributor) {
                _loadContributorById($stateParams.idContributor);
            }
        };

        /**
         * Handle the on click action for the save button of a contributor.
         */
        vm.saveContributorOnClick = function() {

            var contributor = angular.copy(vm.contributor);

            // Convert all the properties before performing the action.
            springIntegrationService.convertProperty(contributor, CONTRIBUTOR_LINK_PROPERTY_MAPPER, ['beads']);

            if(_isUpdateAction()) {
                contributorRestService.update(contributor.id, contributor, function() {
                    messageService.showSuccessMessage('application.contributor.register.message.successUpdate');
                    $state.go('^', {}, { reload: true }); // redirect to the catalog page.
                });
            } else if(_isCreateAction()) {
                contributorRestService.create(contributor, function() {
                    messageService.showSuccessMessage('application.contributor.register.message.successCreation');
                    $state.go('^', {}, { reload: true }); // redirect to the catalog page.
                });
            }
        };

        /**
         * Verifies if a certain field of the form contains error or not.
         * @param field The field name to be validated.
         * @param validation The type of the validation to be performed.
         * @returns {boolean}
         */
        vm.hasError = function(field, validation) {
            return formValidatorService.hasError($scope.contributorRegisterForm, field, validation);
        };

        /**
         * Verifies if the gender has errors of validation.
         * @returns {boolean}
         */
        vm.genderFieldHasError = function() {
            // Verifies if the field has errors.
            var hasError = $scope.contributorRegisterForm.$submitted && _.isEmpty(vm.contributor.gender);
            // If the field has error change the required value to true.
            $scope.contributorRegisterForm.contributorRegisterFieldGender.$setValidity("required", !hasError);
            return hasError;
        };

        /**
         * Verifies whether the bead tables will be shown or not.
         * @returns {Boolean}
         */
        vm.isBeadTableToBeShown = function() {
            return vm.contributor && vm.contributor.id;
        };

        /**
         * Load a certain contributor by their identifier.
         * @param {Number} contributorId
         * @private
         */
        function _loadContributorById(contributorId) {
            contributorRestService.find(contributorId, function(response) {
                // Retrieve only the data from the links: 'beads'.
                springIntegrationService.retrieveDataFromItemLinks(response, ['beads'])
                    .then(function() {
                        // Retrieve all the campaigns associated to each bead.
                        springIntegrationService.retrieveDataFromItemsLinks(response.beads._embeddedItems, ['campaign'])
                            .then(function() {
                                vm.contributor = response;
                            });
                    });
            });
        }

        /**
         * Verifies if the action is an update.
         * @returns {Boolean}
         * @private
         */
        function _isUpdateAction() {
            return $stateParams.idContributor || vm.contributor.id;
        }

        /**
         * Verifies if the action is an create.
         * @returns {boolean}
         * @private
         */
        function _isCreateAction() {
            return !$stateParams.idContributor && !vm.contributor.id;
        }
    }
    module.controller('contributorRegisterController', [
        '$scope',
        '$state',
        '$stateParams',
        'messageService',
        'formValidatorService',
        'contributorRestService',
        'springIntegrationService',
        'GENDER_CATALOG',
        'CIVIL_STATE_CATALOG',
        'CONTRIBUTOR_LINK_PROPERTY_MAPPER',
        ContributorRegisterController
    ]);
}());
