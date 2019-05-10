import '../app.contribution.module';

/**
 * @desc Configures the contribution module.
 * @author William Custodio
 */
(function () {
    'use strict';

    /**
     * Mapper used to catalog all the possible search options.
     * @type {*[]}
     */
    const SEARCH_OPTION_CATALOG = [{
        'label': 'application.contribution.register.form.field.search.option.bead',
        'value': 'BEAD'
    },{
        'label': 'application.contribution.register.form.field.search.option.contributor',
        'value': 'CONTRIBUTOR'
    }];
    angular.module('paymentManagement.contribution').constant("SEARCH_OPTION_CATALOG", SEARCH_OPTION_CATALOG);

    /**
     * Mapper used to map the name of the property in a contribution JSON object and its representation as link.
     * @type {*[]}
     */
    const CONTRIBUTION_LINK_PROPERTY_MAPPER = [{
        name: 'campaign',
        link: '/campaigns/%s',
    }, {
        name: 'contributor',
        link: '/contributors/%s'
    }];
    angular.module('paymentManagement.contribution').constant("CONTRIBUTION_LINK_PROPERTY_MAPPER", CONTRIBUTION_LINK_PROPERTY_MAPPER);
}());