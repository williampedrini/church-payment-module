import '../app.campaign.module';

/**
 * @desc Configures the campaign module.
 * @author William Custodio
 */
(function () {
    'use strict';

    /**
     * Mapper used to map the name of the property in a campaign JSON object and its representation as link.
     * @type {*[]}
     */
    const CAMPAIGN_LINK_PROPERTY_MAPPER = [{
        name: 'church',
        link: '/churches/%s',
    }, {
        name: 'provingType',
        link: '/provingTypes/%s'
    }, {
        name: 'contributions',
        link: '/contributions/%s'
    }, {
        name: 'beads',
        link: '/beads/%s'
    }];
    angular.module('paymentManagement.campaign').constant("CAMPAIGN_LINK_PROPERTY_MAPPER", CAMPAIGN_LINK_PROPERTY_MAPPER);
}());