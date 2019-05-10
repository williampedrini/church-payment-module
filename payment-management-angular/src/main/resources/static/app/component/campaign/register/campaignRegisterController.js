import 'lodash';
import '../app.campaign.module';
import '../../message/messageService';
import '../service/campaignRestService';
import '../../church/service/churchRestService';
import '../../provingType/service/provingTypeRestService';
import '../../../shared/form/validator/formValidatorService';

/**
 * @desc This Controller is responsible for handling the view 'campaignRegisterView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.campaign');

    function CampaignRegisterController($scope, $state, $stateParams, messageService,
                                        formValidatorService, campaignRestService, churchRestService,
                                        provingTypeRestService, springIntegrationService, CAMPAIGN_LINK_PROPERTY_MAPPER) {
        const vm = this;

        /**
         * List of all existing churches in the system.
         * @type {Array}
         */
        vm.churches = [];

        /**
         * List of all existing proving types in the system.
         * @type {Array}
         */
        vm.provingTypes = [];

        /**
         * The campaign to be edited/created.
         * @type {{Object}}
         */
        vm.campaign = {
            id: null,
            name: null,
            creationDate: new Date(),
            initialDate: new Date(),
            finalDate: null,
            church: null,
            provingType: null,
            contributions: [],
            beads: []
        };

        /**
         * Function responsible for handling the hook for the initialization of the controller.
         */
        vm.onInit = function() {
            if($stateParams.idCampaign) {
                _loadCampaignById($stateParams.idCampaign);
            }
            _findAllChurch();
            _findAllProvingType();
        };

        /**
         * Handle the on click action for the save button of a campaign.
         */
        vm.saveCampaignOnClick = function() {

            var campaign = angular.copy(vm.campaign);

            // Convert all the properties before performing the action.
            springIntegrationService.convertProperty(campaign, CAMPAIGN_LINK_PROPERTY_MAPPER);

            if(_isUpdateAction()) {
                campaignRestService.update(campaign.id, campaign, function() {
                    messageService.showSuccessMessage('application.campaign.register.message.successUpdate');
                    $state.go('^', {}, { reload: true }); // redirect to the catalog page.
                });
            } else if(_isCreateAction()) {
                campaignRestService.create(campaign, function() {
                    messageService.showSuccessMessage('application.campaign.register.message.successCreation');
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
            return formValidatorService.hasError($scope.campaignRegisterForm, field, validation);
        };

        /**
         * Verifies if the field 'campaignRegisterProvingType' should be disabled
         * @param field The field name to be validated.
         * @param validation The type of the validation to be performed.
         * @returns
         */
        vm.isCampaignRegisterProvingTypeDisabled = function() {
            return vm.campaign && vm.campaign.id && vm.campaign.provingType;
        };

        /**
         * Load a certain campaign by their identifier.
         * @param {Number} campaignId
         * @private
         */
        function _loadCampaignById(campaignId) {
            campaignRestService.find(campaignId, function(response) {
                // Retrieve only the data from the links: 'provingType' and 'church'.
                springIntegrationService.retrieveDataFromItemLinks(response, ['provingType', 'church'])
                    .then(function(result) {
                        vm.campaign = response;
                    });
            });
        }

        /**
         * Find all existing churches in the database.
         * @private
         */
        function _findAllChurch() {
            churchRestService.findAll(function(response) {
                vm.churches = response._embeddedItems;
            });
        }

        /**
         * Find all existing proving types in the database.
         * @private
         */
        function _findAllProvingType() {
            provingTypeRestService.findAll(function(response) {
                vm.provingTypes = response._embeddedItems;
            });
        }

        /**
         * Verifies if the action is an update.
         * @returns {Boolean}
         * @private
         */
        function _isUpdateAction() {
            return $stateParams.idCampaign || vm.campaign.id;
        }

        /**
         * Verifies if the action is an create.
         * @returns {boolean}
         * @private
         */
        function _isCreateAction() {
            return !$stateParams.idCampaign && !vm.campaign.id;
        }
    }
    module.controller('campaignRegisterController', [
        '$scope',
        '$state',
        '$stateParams',
        'messageService',
        'formValidatorService',
        'campaignRestService',
        'churchRestService',
        'provingTypeRestService',
        'springIntegrationService',
        'CAMPAIGN_LINK_PROPERTY_MAPPER',
        CampaignRegisterController
    ]);
}());
