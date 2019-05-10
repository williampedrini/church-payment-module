import '../app.contributor.module'

/**
 * @desc Configures the contributor module.
 * @author William Custodio
 */
(function () {
    'use strict';

    /**
     * Mapper used to catalog all the possible download url.
     * @type {*[]}
     */
    const DOWNLOAD_URL_CATALOG = [{
        'label': 'application.contributor.label.download.tag',
        'value': 'TAG'
    },{
        'label': 'application.contributor.label.download.celebration',
        'value': 'CELEBRATION'
    },{
        'label': 'application.contributor.label.download.contribution',
        'value': 'CONTRIBUTION'
    }];
    angular.module('paymentManagement.contributor').constant("DOWNLOAD_URL_CATALOG", DOWNLOAD_URL_CATALOG);

    /**
     * Mapper used to catalog all the possible genders assumed by a contributor.
     * @type {*[]}
     */
    const GENDER_CATALOG = [{
        'label': 'application.contributor.label.gender.male',
        'value': 'MALE'
    },{
        'label': 'application.contributor.label.gender.female',
        'value': 'FEMALE'
    }];
    angular.module('paymentManagement.contributor').constant("GENDER_CATALOG", GENDER_CATALOG);

    /**
     * Mapper used to catalog all the possible civil states assumed by a contributor.
     * @type {*[]}
     */
    const CIVIL_STATE_CATALOG = [{
        'label': 'application.contributor.label.civilState.divorced',
        'value': 'DIVORCED'
    }, {
        'label': 'application.contributor.label.civilState.married',
        'value': 'MARRIED'
    }, {
        'label': 'application.contributor.label.civilState.single',
        'value': 'SINGLE'
    }, {
        'label': 'application.contributor.label.civilState.stableUnion',
        'value': 'STABLE_UNION'
    }, {
        'label': 'application.contributor.label.civilState.widower',
        'value': 'WIDOWER'
    }];
    angular.module('paymentManagement.contributor').constant("CIVIL_STATE_CATALOG", CIVIL_STATE_CATALOG);

    /**
     * Mapper used to catalog all the possible celebrations used to filter a contributor.
     * @type {*[]}
     */
    const CELEBRATION_CATALOG = [{
        'label': 'application.contributor.catalog.form.field.celebration.birthday',
        'value': 'BIRTHDAY'
    }, {
        'label': 'application.contributor.catalog.form.field.celebration.marriage',
        'value': 'MARRIAGE'
    }];
    angular.module('paymentManagement.contributor').constant("CELEBRATION_CATALOG", CELEBRATION_CATALOG);

    /**
     * Mapper used to map the name of the property in a contributor JSON object and its representation as link.
     * @type {*[]}
     */
    const CONTRIBUTOR_LINK_PROPERTY_MAPPER = [{
        name: 'beads',
        link: '/beads/%s',
    }, {
        name: 'contributions',
        link: '/contributions/%s'
    }];
    angular.module('paymentManagement.contributor').constant("CONTRIBUTOR_LINK_PROPERTY_MAPPER", CONTRIBUTOR_LINK_PROPERTY_MAPPER);
}());
