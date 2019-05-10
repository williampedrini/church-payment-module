package br.com.payment.management.core.report.enumerable;

import br.com.payment.management.core.report.service.ReportGeneratorService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Catalog responsible for mapping all the existing {@link ReportGeneratorService} by type.
 *
 * @author William Custodio
 */
@AllArgsConstructor
public enum GeneratorType {

    TAG("tags_%s", "tag.ftl"),

    CAMPAIGN("lamcamentos_%s", "campaign.ftl"),

    CONTRIBUTION("contribuicoes_%s", "contribution.ftl"),

    CONTRIBUTION_BY_CONTRIBUTOR("%s_%s", "contribution-by-contributor.ftl"),

    CELEBRATION("celebracoes_%s", "celebration.ftl");

    @Getter
    private String fileNamePattern;
    @Getter
    private String template;
}