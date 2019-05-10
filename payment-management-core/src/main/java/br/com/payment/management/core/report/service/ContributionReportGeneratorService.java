package br.com.payment.management.core.report.service;

import br.com.payment.management.core.contribution.repository.ContributionRepository;
import br.com.payment.management.core.report.enumerable.GeneratorType;
import br.com.payment.management.core.report.model.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;

/**
 * A service responsible for handling the generation of a file based on the 'contribution.ftl' template.
 *
 * @author William Custodio
 */
@Service("contributionReportGeneratorService")
class ContributionReportGeneratorService extends ReportGeneratorService {

    private ContributionRepository contributionRepository;

    @Autowired
    public ContributionReportGeneratorService(final ContributionRepository contributionRepository) {
        this.contributionRepository = contributionRepository;
    }

    @Override
    GeneratorType getType() {
        return GeneratorType.CONTRIBUTION;
    }

    @Override
    Map<String, Object> getData(final Criteria criteria) {
        return Collections.singletonMap("contributions", this.contributionRepository.findAllByIdIn(criteria.getIds()));
    }

    @Override
    String getDefaultFileName(final Criteria criteria) {
        return String.format(this.getType().getFileNamePattern(),
                LocalDateTime.now().format(ReportGeneratorService.DATE_TIME_FORMATTER));
    }
}