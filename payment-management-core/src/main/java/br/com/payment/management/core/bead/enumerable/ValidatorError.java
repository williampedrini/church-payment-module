package br.com.payment.management.core.bead.enumerable;

/**
 * Catalog of all possible error messages used by a {@link br.com.payment.management.core.bead.service.BeadServiceValidator}
 *
 * @author William Custodio
 */
public enum ValidatorError {

    DUPLICATED("application.bead.messages.duplicated",
            "There is already a bead for the campaign with id %s and user with id %s.");

    private String key;

    private String message;

    ValidatorError(final String key, final String message) {
        this.key = key;
        this.message = message;
    }

    public String getKey() {
        return key;
    }

    public String getMessage() {
        return message;
    }
}
