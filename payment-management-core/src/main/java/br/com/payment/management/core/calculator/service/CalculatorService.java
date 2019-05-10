package br.com.payment.management.core.calculator.service;

import br.com.payment.management.core.calculator.model.ContributionCalculation;
import br.com.payment.management.core.calculator.repository.CalculatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Service responsible for handling calculation's processes.
 *
 * @author williamcustodio
 */
@Service
@Transactional
public class CalculatorService {

    private final CalculatorRepository calculatorRepository;

    @Autowired
    public CalculatorService(final CalculatorRepository calculatorRepository) {
        this.calculatorRepository = calculatorRepository;
    }

    /**
     * Get the sum of all contributions by a specific month and year.
     * @return The found calculation result.
     */
    public List<ContributionCalculation> getCalculationByMonthAndYear() {
        return this.calculatorRepository.getCalculationByMonthAndYear();
    }
}