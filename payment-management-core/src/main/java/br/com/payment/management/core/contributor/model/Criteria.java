package br.com.payment.management.core.contributor.model;

import br.com.payment.management.core.report.enumerable.CelebrationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

/**
 * Defines a filter criteria used to search for {@link br.com.payment.management.core.contributor.model.Contributor}.
 *
 * @author williamcustodio
 */
@Data
@Builder
public class Criteria {
	private String name;
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	private LocalDate beginDate;
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	private LocalDate endDate;
	private CelebrationType celebration;
}