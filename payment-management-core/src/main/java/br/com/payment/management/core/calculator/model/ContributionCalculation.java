package br.com.payment.management.core.calculator.model;

import br.com.payment.management.core.contribution.model.Contribution;
import lombok.Data;

/**
 * Represents the result for a specific calculation for a {@link Contribution}.
 *
 * @author williamcustodio
 */
@Data
public class ContributionCalculation {
    private String campaign;
    private String period;
    private Long total;
}