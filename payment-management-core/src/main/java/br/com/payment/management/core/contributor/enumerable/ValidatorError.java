package br.com.payment.management.core.contributor.enumerable;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * All the possible messages thrown by a {@link br.com.payment.management.core.contributor.service.ContributorServiceValidator}.
 *
 * @author williamcustodio
 */
@AllArgsConstructor
public enum ValidatorError {

    MARRIAGE_DATE_EMPTY("application.contributor.messages.marriageDate.empty",
            "There marriage date is mandatory for the civil type %s."),

    PARTNER_NAME_EMPTY("application.contributor.messages.partnerName.empty",
            "The partner name is mandatory for the civil type %s."),

    DATE_RANGE_EMPTY("application.contributor.catalog.messages.celebration.dateRange.empty",
            "The date range to build perform the search for contributors is mandatory."),

    DATE_RANGE_INVALID("application.contributor.catalog.messages.celebration.dateRange.invalid",
            "The date range with beginning %s and final %s to search contributors."),

    CELEBRATION_TYPE_EMPTY("application.contributor.catalog.messages.celebration.empty",
            "The celebration type is mandatory.");
    @Getter
    private String key;
    @Getter
    private String message;
}