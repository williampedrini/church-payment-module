package br.com.payment.management.core.common.enumerable;

/**
 * Catalog with all main information used by the unit tests.
 *
 * @author William Custodio
 */
public enum ConfigurationCatalog {

    BASE_MOCK_DIRECTORY("/mock"),

    BEAD_FILE_PATH(BASE_MOCK_DIRECTORY.getValue() + "/bead.json"),

    CAMPAIGN_FILE_PATH(BASE_MOCK_DIRECTORY.getValue() + "/campaign.json"),

    CHURCH_FILE_PATH(BASE_MOCK_DIRECTORY.getValue() + "/church.json"),

    CONTRIBUTOR_FILE_PATH(BASE_MOCK_DIRECTORY.getValue() + "/contributor.json"),

    CONTRIBUTION_FILE_PATH(BASE_MOCK_DIRECTORY.getValue() + "/contribution.json");

    private String value;

    ConfigurationCatalog(final String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
