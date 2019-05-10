package br.com.payment.management.core.contribution.enumerable;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * All the possible messages thrown by a {@link br.com.payment.management.core.contribution.service.ContributionServiceValidator}.
 *
 * @author williamcustodio
 */
@AllArgsConstructor
public enum ValidatorError {

    BEAD_ASSOCIATION_EMPTY("application.contribution.messages.bead.empty",
            "There is no bead for the current contribution with id %s."),

    EXPIRED_CAMPAIGN("application.contribution.messages.campaign.expired",
            "The campaign with id %s is expired."),

    INVALID_CREATION_DATE("application.contribution.messages.creationDate.invalid",
            "The contributor for the campaign with is %s has the creation day higher than allowed.");
    @Getter
    private String key;
    @Getter
    private String message;
}