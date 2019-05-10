import '../app.bead.module';

/**
 * @desc Configures the bead module.
 * @author William Custodio
 */
(function () {
    'use strict';

    /**
     * Represents a bead itself.
     * @type {{id: null, identificationNumber: null, contributor: {id: null}, campaign: {id: null}}}
     */
    const BEAD_TEMPLATE = {
        id: null,
        identificationNumber: null,
        contributor: {
            id: null
        },
        campaign: {
            id: null
        }
    };
    angular.module('paymentManagement.bead').constant("BEAD_TEMPLATE", BEAD_TEMPLATE);

    /**
     * Mapper used to map the name of the property in a bead JSON object and its representation as link.
     * @type {*[]}
     */
    const BEAD_LINK_PROPERTY_MAPPER = [{
        name: 'campaign',
        link: '/campaigns/%s'
    }, {
        name: 'contributor',
        link: '/contributors/%s'
    }, {
        name: 'contributions',
        link: '/contributions/%s'
    }];
    angular.module('paymentManagement.bead').constant("BEAD_LINK_PROPERTY_MAPPER", BEAD_LINK_PROPERTY_MAPPER);
}());