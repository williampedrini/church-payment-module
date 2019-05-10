package br.com.payment.management.core.report.enumerable;

import br.com.payment.management.core.report.service.ReportGeneratorService;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * All the possible messages thrown by a {@link ReportGeneratorService}.
 *
 * @author William Custodio
 */
@AllArgsConstructor
public enum ValidatorError {

    UNKNOWN_ERROR("application.report.messages.unknown", "Error while generating the template %s."),

    CRITERIA_EMPTY("application.report.messages.filter.empty",
            "The criteria to build the %s report is mandatory."),

    CELEBRATION_TYPE_EMPTY("application.report.messages.filter.celebration.empty",
            "The celebration type is mandatory."),

    ID_EMPTY("application.report.messages.filter.identifier.empty",
            "The %s identifier to build the %s report is mandatory."),

    DATE_RANGE_EMPTY("application.report.messages.filter.dateRange.empty",
            "The date range to build the %s report is mandatory."),

    DATE_RANGE_INVALID("application.report.messages.filter.dateRange.invalid",
            "The date range with beginning %s and final %s is invalid for the generation of the template %s."),

    RESOURCE_NOT_FOUND("application.report.messages.resource.notFound",
            "The %s with id %s was not found to build the %s report.");
    @Getter
    private String key;
    @Getter
    private String message;
}