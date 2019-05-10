package br.com.payment.management.core.report.service;

import br.com.payment.management.core.calculator.repository.CalculatorRepository;
import br.com.payment.management.core.common.exception.BusinessException;
import br.com.payment.management.core.contributor.model.Contributor;
import br.com.payment.management.core.contributor.repository.ContributorRepository;
import br.com.payment.management.core.report.enumerable.GeneratorType;
import br.com.payment.management.core.report.enumerable.ValidatorError;
import br.com.payment.management.core.report.model.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * A service responsible for handling the generation of a file based on the 'contribution-by-contributor.ftl' template.
 *
 * @author William Custodio
 */
@Service("contributionByContributorReportGeneratorService")
class ContributionByContributorReportGeneratorService extends ReportGeneratorService {

    private CalculatorRepository calculatorRepository;

    private ContributorRepository contributorRepository;

    @Autowired
    public ContributionByContributorReportGeneratorService(final ContributorRepository contributorRepository,
                                              final CalculatorRepository calculatorRepository) {
        this.contributorRepository = contributorRepository;
        this.calculatorRepository = calculatorRepository;
    }

    @Override
    GeneratorType getType() {
        return GeneratorType.CONTRIBUTION_BY_CONTRIBUTOR;
    }

    @Override
    Map<String, Object> getData(final Criteria criteria) {

        final Optional<Long> id = criteria.getIds().stream().findFirst();

        if(!id.isPresent()) {
            final String errorMessage = String.format(ValidatorError.ID_EMPTY.getMessage(), "contributor", this.getType().getTemplate());
            throw new BusinessException(ValidatorError.ID_EMPTY.getKey(), errorMessage);
        }

        final Contributor contributor = this.contributorRepository.findOne(id.get());
        if(ObjectUtils.isEmpty(contributor)) {
            final String errorMessage = String.format(ValidatorError.RESOURCE_NOT_FOUND.getMessage(), "contributor", id.get(), this.getType().getTemplate());
            throw new BusinessException(ValidatorError.RESOURCE_NOT_FOUND.getKey(), errorMessage);
        }

        final Map<String, Object> parameters = new HashMap<>();
        parameters.put("contributor", contributor);
        parameters.put("contributions", this.calculatorRepository.getCalculationByContributorIdAndMonthAndYear(id.get()));
        return parameters;
    }

    @Override
    String getDefaultFileName(final Criteria criteria) {
        final Long id = criteria.getIds().stream().findFirst().orElse(null);
        final Contributor contributor = this.contributorRepository.findOne(id);
        return String.format(this.getType().getFileNamePattern(), contributor.getName(),
                LocalDateTime.now().format(ReportGeneratorService.DATE_TIME_FORMATTER));
    }
}