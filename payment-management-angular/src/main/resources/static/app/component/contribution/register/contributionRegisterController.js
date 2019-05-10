import '../app.contribution.module';
import '../service/contributionRestService';
import '../../campaign/service/campaignRestService';
import '../../contributor/service/contributorRestService';

/**
 * @desc This Controller is responsible for handling the view 'contributionRegisterView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.contribution');

    function ContributionRegisterController($scope, $state, $stateParams, messageService, formValidatorService,
                                            beadRestService, campaignRestService, contributorRestService,
                                            contributionRestService, springIntegrationService,
                                            CONTRIBUTION_LINK_PROPERTY_MAPPER, SEARCH_OPTION_CATALOG, PROVING_TYPE_CATALOG) {
        const vm = this;

        /**
         * Catalog with all existing search options.
         */
        vm.searchOptions = SEARCH_OPTION_CATALOG;

        /**
         * List of all the existing campaigns.
         * @type {Array}
         */
        vm.campaigns = [];

        /**
         * List of all the existing contributors.
         * @type {Array}
         */
        vm.contributors = [];

        /**
         * The contribution to be edited/created.
         * @type {{Object}}
         */
        vm.contribution = {
            id: null,
            campaign: {
                id: null
            },
            contributor: {
                id: null
            },
            creationDate: new Date(),
            amount: 0,
            observation: null
        };

        /**
         * Bead number used to fill out automatically the contribution data.
         * @type {string}
         */
        vm.bead = {
            identificationNumber: null
        };

        /**
         * Function responsible for handling the hook for the initialization of the controller.
         */
        vm.onInit = function() {
            if($stateParams.idContribution) {
                _loadContributionById($stateParams.idContribution);
            }
            _findAllCampaign();
            _findAllContributor();
        };

        /**
         * Handle the on click action for the save button of a contribution.
         */
        vm.saveContributionOnClick = function() {

            var contribution = angular.copy(vm.contribution);

            // Convert all the data before persisting into the database.
            _convertDataBeforePersist(contribution);

            if(_isUpdateAction()) {
                contributionRestService.update(contribution.id, contribution, function() {
                    messageService.showSuccessMessage('application.contribution.register.message.successUpdate');
                    $state.go('^', {}, { reload: true }); // redirect to the catalog page.
                });
            } else if(_isCreateAction()) {
                contributionRestService.create(contribution, function() {
                    messageService.showSuccessMessage('application.contribution.register.message.successCreation');
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
            return formValidatorService.hasError($scope.contributionRegisterForm, field, validation);
        };

        /**
         * Verifies if the amount has errors of validation.
         * @returns {boolean}
         */
        vm.amountFieldHasError = function() {
            // Verifies if the field has errors.
            var hasError = $scope.contributionRegisterForm.$submitted && vm.contribution.amount === 0;
            // If the field has error change the required value to true.
            $scope.contributionRegisterForm.contributionRegisterAmount.$setValidity("required", !hasError);
            return hasError;
        };

        /**
         * Search for a combination of campaign and contributor, based on a bead number.
         */
        vm.fillOut = function() {
            if(_isNotValidForAutomaticFilling()) {
                messageService.showWarningMessage("application.contribution.register.message.automaticFill.mandatory");
                return;
            }
            if(_isCampaignNotValidForAutomaticFilling()) {
                messageService.showWarningMessage("application.contribution.register.message.automaticFill.campaign.provingType");
                return;
            }
            _fillOutByValidCombination();
        };

        /**
         * Verifies if the field should be disabled 'contributionRegisterBeadNumber'.
         * @returns {boolean}
         */
        vm.isBeadNumberFieldDisabled = function() {
            return vm.contribution.id;
        };

        /**
         * Verifies if the field should be disabled 'contributionRegisterContributor'.
         * @returns {boolean}
         */
        vm.isContributorFieldDisabled = function() {
            return vm.contribution && vm.contribution.id && vm.contribution.contributor.id;
        };

        /**
         * Verifies if the field should be disabled 'contributionRegisterCampaign'.
         * @returns {boolean}
         */
        vm.isCampaignFieldDisabled = function() {
            return vm.contribution && vm.contribution.id;
        };

        /**
         * Verifies if the field should be disabled the button responsible for filling out the form.
         * @returns {boolean}
         */
        vm.isAutomaticFillButtonDisabled = function() {
            return vm.contribution && vm.contribution.id;
        };

        /**
         * Load a certain contribution by their identifier.
         * @param {Number} contributionId
         * @private
         */
        function _loadContributionById(contributionId) {
            contributionRestService.find(contributionId, function(response) {
                // Retrieve only the data from the links: 'campaign' and 'contributor'.
                springIntegrationService.retrieveDataFromItemLinks(response, ['campaign', 'contributor'])
                    .then(function() {
                        vm.contribution = response;
                        // Converts the amount to cents.
                        vm.contribution.amount = vm.contribution.amount/100;
                    })
                    .then(_populateContributionWithBead);
            });
        }

        /**
         * Search for all existing campaigns in the database.
         * @private
         */
        function _findAllCampaign() {
            campaignRestService.findAll(null, function(response) {
                springIntegrationService.retrieveDataFromItemsLinks(response._embeddedItems, ['provingType'])
                    .then(function() {
                        vm.campaigns = response._embeddedItems;
                    });
            });
        }

        /**
         * Search for all existing contributors in the database.
         * @private
         */
        function _findAllContributor() {
            contributorRestService.findAll(null, function(response) {
                vm.contributors = response;
            });
        }

        /**
         * Convert all the data before persisting into the database.
         * @param contribution The contribution to be persisted.
         * @private
         */
        function _convertDataBeforePersist(contribution) {
            // Converts the amount to cents.
            contribution.amount = contribution.amount*100;
            // Convert all the properties before performing the action.
            springIntegrationService.convertProperty(contribution, CONTRIBUTION_LINK_PROPERTY_MAPPER);
        }

        /**
         * Verifies if the action is an update.
         * @returns {Boolean}
         * @private
         */
        function _isUpdateAction() {
            return $stateParams.idContribution || vm.contribution.id;
        }

        /**
         * Verifies if the action is an create.
         * @returns {boolean}
         * @private
         */
        function _isCreateAction() {
            return !$stateParams.idContribution && !vm.contribution.id;
        }

        /**
         * Fill out the form by the existing valid combination.
         * @private
         */
        function _fillOutByValidCombination() {
            if(_isValidForBeadFilling()) {
                _populateContributionWithBead();
            } else if(_isValidForContributorFilling()) {
                _populateContributionWithContributor();
            }
        }

        /**
         * Populate the contribution with its respective bead (if there is any).
         * @private
         */
        function _populateContributionWithBead() {
            beadRestService.findByCampaignIdAndContributorId(vm.contribution.campaign.id, vm.contribution.contributor.id, function(response) {
                springIntegrationService.retrieveDataFromItemLinks(response, ['campaign', 'contributor'])
                    .then(function() {
                        vm.bead = response;
                    });
            });
        }

        /**
         * Populate the contribution with its respective bead (if there is any).
         * @private
         */
        function _populateContributionWithContributor() {
            beadRestService.findByIdentificationNumberAndCampaignId(vm.bead.identificationNumber, vm.contribution.campaign.id, function(response) {
                springIntegrationService.retrieveDataFromItemLinks(response, ['contributor'])
                    .then(function() {
                        vm.contribution.contributor.id = response.contributor.id;
                    });
            });
        }

        /**
         * Verifies if the current campaign has valid information to be used for the process of automatic filling.
         * @returns {boolean}
         */
        function _isCampaignNotValidForAutomaticFilling() {
            if(vm.contribution.campaign && vm.contribution.campaign.id) {
                var campaign = vm.campaigns.filter(function(campaign) {
                    return campaign.id === vm.contribution.campaign.id;
                });
                // If the campaign does not have the proving type as a bead, it will not fill out.
                return campaign[0].provingType.mnemonic !== PROVING_TYPE_CATALOG[0].value;
            }
            return false;
        }

        /**
         * Verifies if the current form content is eligible for filling.
         * @returns {boolean}
         */
        function _isNotValidForAutomaticFilling() {
            return !_isValidForContributorFilling() && !_isValidForBeadFilling();
        }

        /**
         * Verifies if the current form content is eligible for contributor filling.
         * @returns {boolean}
         */
        function _isValidForContributorFilling() {
            return vm.bead.identificationNumber && vm.bead.identificationNumber !== ""
                && vm.contribution.campaign && vm.contribution.campaign.id;
        }

        /**
         * Verifies if the current form content is eligible for bead filling.
         * @returns {boolean}
         */
        function _isValidForBeadFilling() {
            return vm.contribution.campaign && vm.contribution.campaign.id
                && vm.contribution.contributor && vm.contribution.contributor.id;
        }
    }
    module.controller('contributionRegisterController', [
        '$scope',
        '$state',
        '$stateParams',
        'messageService',
        'formValidatorService',
        'beadRestService',
        'campaignRestService',
        'contributorRestService',
        'contributionRestService',
        'springIntegrationService',
        'CONTRIBUTION_LINK_PROPERTY_MAPPER',
        'SEARCH_OPTION_CATALOG',
        'PROVING_TYPE_CATALOG',
        ContributionRegisterController
    ]);
}());
