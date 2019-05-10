package br.com.payment.management.core.report.model;

import lombok.Builder;
import lombok.Getter;

/**
 * Represents a final report file generate by a {@link br.com.payment.management.core.report.service.ReportGeneratorService}
 *
 * @author William Custodio
 */
@Builder
public class ReportFile {
    @Getter
    private byte[] content;
    @Getter
    private String name;
}
