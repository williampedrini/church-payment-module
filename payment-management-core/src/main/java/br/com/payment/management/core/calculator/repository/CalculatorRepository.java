package br.com.payment.management.core.calculator.repository;

import br.com.payment.management.core.calculator.model.ContributionCalculation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * A custom Data Access Object used to perform queries to perform calculations.
 *
 * @author williamcustodio
 */
@Repository
@SuppressWarnings("unchecked")
public class CalculatorRepository {

    private final EntityManager entityManager;

	@Autowired
	public CalculatorRepository(final EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	/**
     * Get the sum of all contributions by a specific month and year.
     * @return The found calculation result.
     */
    public List<ContributionCalculation> getCalculationByMonthAndYear() {
        final StringBuilder queryBuilder = new StringBuilder();
        queryBuilder.append("select ca.name as campaign, ");
        queryBuilder.append("concat(lpad(month(co.creation_date), 2, '0'), '/' ,year(co.creation_date)) as period, ");
        queryBuilder.append("sum(co.amount) as total ");
        queryBuilder.append("from contribution co ");
        queryBuilder.append("inner join campaign ca on ca.id = co.id_campaign ");
        queryBuilder.append("group by campaign, period");
        return this.map(this.entityManager.createNativeQuery(queryBuilder.toString()).getResultList());
    }

    public List<ContributionCalculation> getCalculationByContributorIdAndMonthAndYear(final Long contributorId) {

        final StringBuilder queryBuilder = new StringBuilder();
        queryBuilder.append("select ca.name as campaign, ");
        queryBuilder.append("concat(lpad(month(co.creation_date), 2, '0'), '/' ,year(co.creation_date)) as period, ");
        queryBuilder.append("sum(co.amount) as total ");
        queryBuilder.append("from contribution co ");
        queryBuilder.append("inner join campaign ca on ca.id = co.id_campaign ");
        queryBuilder.append("where co.id_contributor = :contributorId ");
        queryBuilder.append("group by campaign, period");

        final Query query = this.entityManager.createNativeQuery(queryBuilder.toString());
        query.setParameter("contributorId", contributorId);
        return this.map(query.getResultList());
    }

    private List<ContributionCalculation> map(final List<Object[]> results) {
        return results.stream().map(result -> {
            ContributionCalculation contributionCalculation = new ContributionCalculation();
            contributionCalculation.setCampaign((String) result[0]);
            contributionCalculation.setPeriod((String) result[1]);
            contributionCalculation.setTotal(((BigDecimal) result[2]).longValue());
            return contributionCalculation;
        }).collect(Collectors.toList());
    }
}
