package br.com.payment.management.core.contributor.service;

import br.com.payment.management.core.bead.repository.BeadRepository;
import br.com.payment.management.core.common.exception.BusinessException;
import br.com.payment.management.core.common.service.CommonServiceValidator;
import br.com.payment.management.core.contribution.repository.ContributionRepository;
import br.com.payment.management.core.contributor.enumerable.ValidatorError;
import br.com.payment.management.core.contributor.model.Contributor;
import br.com.payment.management.core.contributor.model.Criteria;
import br.com.payment.management.core.contributor.repository.ContributorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.Objects.*;

/**
 * Service responsible for handling processes related to a {@link br.com.payment.management.core.contributor.model.Contributor}.
 *
 * @author williamcustodio
 */
@Service
@Transactional
public class ContributorService {

    private final BeadRepository beadRepository;

    private final ContributionRepository contributionRepository;

    private final ContributorRepository contributorRepository;

    private final CommonServiceValidator commonServiceValidator;

    @Autowired
    public ContributorService(final BeadRepository beadRepository, final ContributionRepository contributionRepository,
							  final ContributorRepository contributorRepository, final CommonServiceValidator commonServiceValidator) {
        this.beadRepository = beadRepository;
        this.contributionRepository = contributionRepository;
        this.contributorRepository = contributorRepository;
        this.commonServiceValidator = commonServiceValidator;
    }

    /**
     * Delete all associations of a contributor.
     * @param contributor The contributor to be deleted.
     */
    public void deleteAssociations(final Contributor contributor) {
        this.beadRepository.delete(contributor.getBeads());
        this.contributionRepository.delete(contributor.getContributions());
    }

    /**
     * Find all existing contributors that have their identifier inside the defined list.
     * @param ids The list with all possible contributors.
     * @return The found contributors.
     */
    public List<Contributor> findAllByIdIn(List<Long> ids) {
        return this.contributorRepository.findAllByIdIn(ids);
    }

    /**
     * Find all existing contributors that full fills the defined criteria.
     * @param criteria The criteria used to filter the contributors.
     * @return The found contributors.
     */
    public List<Contributor> findAll(final Criteria criteria) {

        validateBeforeSearch(criteria);

        final List<Contributor> contributors = this.contributorRepository.findAll();
        if(nonNull(criteria)) {
            return filterByCriteria(criteria, contributors);
        }

        return contributors;
    }

    /**
     * Filter a list of contributors based on a criteria.
     * @param criteria The object containing the criteria.
     * @param contributors A list containing the contributors to be filtered.
     * @return The filtered list.
     */
    private List<Contributor> filterByCriteria(final Criteria criteria, final List<Contributor> contributors) {
        Stream<Contributor> contributorStream = contributors.stream();
        contributorStream = filterByName(criteria, contributorStream);
        contributorStream = filterByCelebration(criteria, contributorStream);
        return contributorStream.collect(Collectors.toList());
    }

    /**
     * Verifies whether the day of the month and the month of a date is between the current year.
     * @param date The date to be validated.
     * @param begin The begging of the date range.
     * @param end The ending of the date range.
     * @return <code>true: </code> Is between. </br>
     *         <code>false: </code> Is not between.
     */
    private boolean isBetweenCurrentDateRange(final LocalDate date, final LocalDate begin, final LocalDate end) {
        final LocalDate currentMarriageDay = LocalDate.of(begin.getYear(), date.getMonth(), date.getDayOfMonth());
        return commonServiceValidator.isBetween(currentMarriageDay, begin, end);
    }

    /**
     * Filter an existing list of contributors according to a criteria.
     * @param criteria The criteria containing the name of the contributor.
     * @param contributors The stream containing all the contributors to be filtered.
     * @return A stream containing all the filtered contributors.
     */
    private Stream<Contributor> filterByName(final Criteria criteria, final Stream<Contributor> contributors) {
        if(!ObjectUtils.isEmpty(criteria.getName())) {
            return contributors.filter(contributor -> contributor.getName().toUpperCase()
                    .contains(criteria.getName().toUpperCase()));
        }
        return contributors;
    }

    /**
     * Filter an existing list of contributors according to a criteria.
     * @param criteria The criteria containing the celebration type.
     * @param contributors The stream containing all the contributors to be filtered.
     * @return A stream containing all the filtered contributors.
     */
    private Stream<Contributor> filterByCelebration(final Criteria criteria, final Stream<Contributor> contributors) {
        if(nonNull(criteria.getCelebration())) {
            switch (criteria.getCelebration()) {
                case BIRTHDAY:
                    return contributors
							.filter(contributor -> Objects.nonNull(contributor.getBirthDate()))
							.filter(contributor ->
                            isBetweenCurrentDateRange(contributor.getBirthDate(), criteria.getBeginDate(), criteria.getEndDate()));
                case MARRIAGE:
                    return contributors
							.filter(contributor -> Objects.nonNull(contributor.getMarriageDate()))
							.filter(contributor ->
                            isBetweenCurrentDateRange(contributor.getMarriageDate(), criteria.getBeginDate(), criteria.getEndDate()));
            }
        }
        return contributors;
    }

    /**
     * Performs a validation over all the defined criteria before any search is executed.
     * @param criteria The object containing the data to be validated.
     */
    private void validateBeforeSearch(final Criteria criteria) {
        if(nonNull(criteria)) {
            if(nonNull(criteria.getCelebration()) && (isNull(criteria.getBeginDate()) || isNull(criteria.getEndDate()))) {
                throw new BusinessException(ValidatorError.DATE_RANGE_EMPTY.getKey(), ValidatorError.DATE_RANGE_EMPTY.getMessage());
            }
            if(this.commonServiceValidator.isDateRangeInvalid(criteria.getBeginDate(), criteria.getEndDate())) {
                final String errorMessage = String.format(ValidatorError.DATE_RANGE_INVALID.getMessage(), criteria.getBeginDate(), criteria.getEndDate());
                throw new BusinessException(ValidatorError.DATE_RANGE_INVALID.getKey(), errorMessage);
            }
            if(isNull(criteria.getCelebration()) && nonNull(criteria.getBeginDate()) && nonNull(criteria.getEndDate())) {
                final String errorMessage = String.format(ValidatorError.CELEBRATION_TYPE_EMPTY.getMessage(), criteria.getBeginDate(), criteria.getEndDate());
                throw new BusinessException(ValidatorError.CELEBRATION_TYPE_EMPTY.getKey(), errorMessage);
            }
        }
    }
}
