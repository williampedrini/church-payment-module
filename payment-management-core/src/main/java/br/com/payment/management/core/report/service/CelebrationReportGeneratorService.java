package br.com.payment.management.core.report.service;

import br.com.payment.management.core.common.exception.BusinessException;
import br.com.payment.management.core.common.service.CommonServiceValidator;
import br.com.payment.management.core.contributor.model.Contributor;
import br.com.payment.management.core.contributor.service.ContributorService;
import br.com.payment.management.core.report.enumerable.GeneratorType;
import br.com.payment.management.core.report.enumerable.ValidatorError;
import br.com.payment.management.core.report.model.Celebration;
import br.com.payment.management.core.report.model.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * A service responsible for handling the generation of a file based on the 'celebration.ftl' template.
 *
 * @author William Custodio
 */
@Service("celebrationReportGeneratorService")
class CelebrationReportGeneratorService extends ReportGeneratorService {

    private ContributorService contributorService;

    private CommonServiceValidator commonServiceValidator;

    @Autowired
    public CelebrationReportGeneratorService(final ContributorService contributorService,
											 final CommonServiceValidator commonServiceValidator) {
        this.contributorService = contributorService;
        this.commonServiceValidator = commonServiceValidator;
    }

    @Override
    GeneratorType getType() {
        return GeneratorType.CELEBRATION;
    }

    @Override
    Map<String, Object> getData(final Criteria criteria) {

        this.validate(criteria);

        final List<Celebration> celebrations = getCelebrationsByCriteria(criteria);

        final Map<String, Object> parameters = new HashMap<>();
        parameters.put("criteria", criteria);
        parameters.put("celebrations", celebrations);
        return parameters;
    }

    @Override
    String getDefaultFileName(final Criteria criteria) {
        return String.format(this.getType().getFileNamePattern(),
				LocalDateTime.now().format(ReportGeneratorService.DATE_TIME_FORMATTER));
    }

    /**
     * Performs validations all over the data used to generate the template.
     * @param criteria The criteria used to retrieve the data used to generate the document.
     */
    private void validate(final Criteria criteria) {

        final LocalDate finalDate = criteria.getEndDate();
        final LocalDate initialDate = criteria.getBeginDate();

        if(ObjectUtils.isEmpty(criteria)) {
            final String errorMessage = String.format(ValidatorError.CRITERIA_EMPTY.getMessage(), this.getType().getTemplate());
            throw new BusinessException(ValidatorError.CRITERIA_EMPTY.getKey(), errorMessage);
        }
        if(ObjectUtils.isEmpty(criteria.getCelebration())) {
            throw new BusinessException(ValidatorError.CELEBRATION_TYPE_EMPTY.getKey(), ValidatorError.CELEBRATION_TYPE_EMPTY.getMessage());
        }
        if(ObjectUtils.isEmpty(criteria.getIds())) {
            final String errorMessage = String.format(ValidatorError.ID_EMPTY.getMessage(), "contributor", this.getType().getTemplate());
            throw new BusinessException(ValidatorError.ID_EMPTY.getKey(), errorMessage);
        }
        if(ObjectUtils.isEmpty(initialDate) || ObjectUtils.isEmpty(finalDate)) {
            final String errorMessage = String.format(ValidatorError.DATE_RANGE_EMPTY.getMessage(), this.getType().getTemplate());
            throw new BusinessException(ValidatorError.DATE_RANGE_EMPTY.getKey(), errorMessage);
        }
        if(this.commonServiceValidator.isDateRangeInvalid(initialDate, finalDate)) {
            final String errorMessage = String.format(ValidatorError.DATE_RANGE_INVALID.getMessage(),
                    initialDate, finalDate, this.getType().getTemplate());
            throw new BusinessException(ValidatorError.DATE_RANGE_INVALID.getKey(), errorMessage);
        }
    }

	/**
	 * Build a list of all existing celebrations based on a criteria.
	 * @param criteria The criteria used to filter the found data.
	 * @return All the built celebrations.
	 */
    private List<Celebration> getCelebrationsByCriteria(final Criteria criteria) {
		final List<Contributor> contributors = this.contributorService.findAllByIdIn(criteria.getIds());
		return contributors.stream()
				.map((contributor) -> Celebration.builder()
						.contributor(contributor)
						.type(criteria.getCelebration())
						.date(contributor.getBirthDate())
						.build())
				.collect(Collectors.toList());
	}
}