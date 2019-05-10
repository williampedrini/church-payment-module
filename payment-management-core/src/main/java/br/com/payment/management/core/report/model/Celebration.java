package br.com.payment.management.core.report.model;

import br.com.payment.management.core.contributor.model.Contributor;
import br.com.payment.management.core.report.enumerable.CelebrationType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

/**
 * Definition of a celebration used by all the {@link br.com.payment.management.core.report.service.CelebrationReportGeneratorService}.
 *
 * @author William Custodio
 */
@Builder
public class Celebration {
    @Getter
    private Contributor contributor;
    @Getter
    private CelebrationType type;
    @Getter
    private LocalDate date;
}