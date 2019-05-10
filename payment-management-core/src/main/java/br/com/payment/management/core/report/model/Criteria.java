package br.com.payment.management.core.report.model;

import br.com.payment.management.core.report.enumerable.CelebrationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

/**
 * Definition of a data filter used by all the {@link br.com.payment.management.core.report.service.ReportGeneratorService}.
 *
 * @author William Custodio
 */
@Data
@Builder(toBuilder = true)
public class Criteria {
    private List<Long> ids;
    private String fileName;
    private ReportFormat format;
    private CelebrationType celebration;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate beginDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate endDate;
}
