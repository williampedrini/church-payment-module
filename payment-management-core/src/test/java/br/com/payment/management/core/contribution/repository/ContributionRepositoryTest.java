package br.com.payment.management.core.contribution.repository;

import br.com.payment.management.core.common.configuration.BaseTestRunner;
import br.com.payment.management.core.common.enumerable.ConfigurationCatalog;
import br.com.payment.management.core.common.util.JSONUtil;
import br.com.payment.management.core.contribution.model.Contribution;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.jdbc.Sql;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * Class responsible for executing unit tests for {@link ContributionRepository}.
 *
 * @author William Custodio
 */
@Transactional
public class ContributionRepositoryTest extends BaseTestRunner {

    /**
     * Expected results used by the unit tests.
     */
    private static final int EXPECTED_NUMBER_OF_CONTRIBUTIONS = 2;

    @Autowired
    private ContributionRepository contributionRepository;

    /**
     * Test the search for all registered contributions in database.
     */
    @Test
    public void testFindAll() {
        final List<Contribution> entities = this.contributionRepository.findAll();
        Assert.assertNotNull(entities);
        Assert.assertFalse(entities.isEmpty());
        Assert.assertEquals(EXPECTED_NUMBER_OF_CONTRIBUTIONS, entities.size());
        entities.forEach(entity -> Assert.assertNotNull(entity.getId()));
    }

    /**
     * Test the persistence of a new {@link Contribution} with valid information.
     */
    @Test
    @Rollback
    public void testSaveWithValidInformation() throws IOException {
        // Get the mocked information to be used as base.
        final Contribution contribution = (Contribution) JSONUtil.fileToBean(ConfigurationCatalog.CONTRIBUTION_FILE_PATH.getValue(), TypeFactory.defaultInstance().constructType(Contribution.class));
        // Performs the persistence of the new contribution.
        this.contributionRepository.save(contribution);
        // Verifies if the number of contributions were increased by 1.
        Assert.assertEquals(EXPECTED_NUMBER_OF_CONTRIBUTIONS + 1, this.contributionRepository.findAll().size());
    }

    /**
     * Test the deletion of a existing {@link Contribution} with valid information.
     */
    @Test
    @Rollback
    public void testDeleteWithValidInformation() {
        // Get the entity to be deleted.
        final List<Contribution> entities = this.contributionRepository.findAll();
        final Optional<Contribution> entity = entities.stream().findFirst();
        Assert.assertTrue(entity.isPresent());
        // Performs the deletion of the new contribution.
        this.contributionRepository.delete(entity.get());
        // Verifies if the number of entities were decreased by 1.
        Assert.assertEquals(EXPECTED_NUMBER_OF_CONTRIBUTIONS - 1, this.contributionRepository.findAll().size());
    }

    @Test
    @Rollback
    @Sql("classpath:find-all-contribution-with-criteria.sql")
    public void testFindAllWithCriteria() {

        final List<Contribution> contributions = this.contributionRepository.findAll("A22",
                "Rifa de Bicicleta", "Rafael Custodio", null, null,
                new PageRequest(0, 10));
        Assert.assertNotNull(contributions);

        final Optional<Contribution> contribution =  contributions.stream().findFirst();
        Assert.assertTrue(contribution.isPresent());

        Assert.assertNotNull(contribution.get().getContributor());
        Assert.assertEquals("Rafael Custodio", contribution.get().getContributor().getName());

        Assert.assertNotNull(contribution.get().getCampaign());
        Assert.assertEquals("Rifa de Bicicleta", contribution.get().getCampaign().getName());

    }
}