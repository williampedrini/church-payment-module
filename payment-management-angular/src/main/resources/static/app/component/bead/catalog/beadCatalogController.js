import '../app.bead.module';
import '../service/beadRestService';
import '../../message/messageService';
import '../register/modal/beadRegisterModalService';
import '../../modal/confirmationModal/confirmationModalService';

/**
 * @desc This Controller is responsible for handling the view 'beadCatalogView.html'
 * @author William Custodio
 */
(function () {
    'use strict';

    const module = angular.module('paymentManagement.bead');

    function BeadCatalogController(messageService, beadRestService, beadRegisterModalService,
                                   confirmationModalService, BEAD_TEMPLATE) {

        const vm = this;

        /**
         * Represents the object containing the bead to be deleted.
         * @type {{id: null, index: null}}
         */
        const _beadToDelete = {
            id: null,
            index: null
        };

        /**
         * Open the modal used to register a bead.
         * @param bead The bead to be created/updated.
         */
        vm.openRegisterModal = function(bead) {
            beadRegisterModalService.open({
                bead: _buildToPersist(bead),
                beads: vm.beads,
                contributor: vm.contributor
            });
        };

        /**
         * Open the confirmation modal used to delete a bead.
         */
        vm.openDeleteConfirmationModal = function() {
            confirmationModalService.open({
                title: 'application.bead.catalog.modal.beadDeletion.title',
                body: 'application.bead.catalog.modal.beadDeletion.body',
                confirmationOnClick: _deleteBead
            });
        };

        /**
         * Defines the information used to delete a certain bead.
         * @param beadId The bead identifier.
         * @param index The index where the bead is located at the beads array.
         */
        vm.setBeadToDelete = function(beadId, index) {
            _beadToDelete.id = beadId;
            _beadToDelete.index = index;
        };

        /**
         * Verifies if the button responsible for adding a new bead is disabled.
         */
        vm.isAddBeadButtonDisabled = function() {
            return !vm.contributor || !vm.contributor.id;
        };

        /**
         * Build a bead before persisting the data.
         * @param baseBead The bead used as base for the build.
         * @returns {*|{id: null, identificationNumber: null, contributor: {id: null}, campaign: {id: null}}}
         * @private
         */
        function _buildToPersist(baseBead) {
            var bead = baseBead || angular.copy(BEAD_TEMPLATE);
            bead.contributor = {id: vm.contributor.id};
            return bead;
        }

        /**
         * Delete a certain bead by their identifier.
         */
        function _deleteBead() {
            beadRestService.remove(_beadToDelete.id, function() {
                vm.beads.splice(_beadToDelete.index,1); // Remove the element from the array.
                messageService.showSuccessMessage('application.bead.catalog.message.successDeletion');
            });
        }
    }
    module.controller('beadCatalogController', [
        'messageService',
        'beadRestService',
        'beadRegisterModalService',
        'confirmationModalService',
        'BEAD_TEMPLATE',
        BeadCatalogController
    ]);
}());