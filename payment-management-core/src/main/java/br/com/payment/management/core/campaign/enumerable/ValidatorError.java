package br.com.payment.management.core.campaign.enumerable;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Catalog of all possible error messages used by a {@link br.com.payment.management.core.campaign.service.CampaignServiceValidator}
 *
 * @author William Custodio
 */
@AllArgsConstructor
public enum ValidatorError {

    DATE_RANGE_INVALID("application.campaign.messages.date.range.invalid",
            "The date range with beginning %s and final %s for the campaign with name %s is invalid."),

    PROVING_TYPE_CHANGED("application.campaign.messages.provingType.changed",
            "The proving type was changed for the campaign with id %s."),

    DUPLICATED_NAME("application.campaign.messages.name.duplicated",
            "There is already a campaign with the name %s.");
    @Getter
    private String key;
    @Getter
    private String message;
}