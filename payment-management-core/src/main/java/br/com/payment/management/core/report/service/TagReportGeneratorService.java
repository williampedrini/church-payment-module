package br.com.payment.management.core.report.service;

import br.com.payment.management.core.contributor.repository.ContributorRepository;
import br.com.payment.management.core.report.enumerable.GeneratorType;
import br.com.payment.management.core.report.model.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;

/**
 * A service responsible for handling the generation of a file based on the 'tag.ftl' template.
 *
 * @author William Custodio
 */
@Service("tagReportGeneratorService")
class TagReportGeneratorService extends ReportGeneratorService {

    private ContributorRepository contributorRepository;

    @Autowired
    public TagReportGeneratorService(final ContributorRepository contributorRepository) {
        this.contributorRepository = contributorRepository;
    }

    @Override
    GeneratorType getType() {
        return GeneratorType.TAG;
    }

    @Override
    Map<String, Object> getData(final Criteria criteria) {
        return Collections.singletonMap("contributors", this.contributorRepository.findAllByIdIn(criteria.getIds()));
    }

    @Override
    String getDefaultFileName(final Criteria criteria) {
        return String.format(this.getType().getFileNamePattern(),
                LocalDateTime.now().format(ReportGeneratorService.DATE_TIME_FORMATTER));
    }
}