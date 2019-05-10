package br.com.payment.management.core.contributor.repository;

import br.com.payment.management.core.common.configuration.BaseTestRunner;
import br.com.payment.management.core.common.enumerable.ConfigurationCatalog;
import br.com.payment.management.core.common.util.JSONUtil;
import br.com.payment.management.core.contributor.model.Contributor;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

/**
 * Class responsible for executing unit tests for {@link ContributorRepository}.
 *
 * @author William Custodio
 */
@Transactional
public class ContributorRepositoryTest extends BaseTestRunner {

    /**
     * Expected results used by the unit tests.
     */
    private static final int EXPECTED_NUMBER_OF_CONTRIBUTORS = 2;

    @Autowired
    private ContributorRepository contributorRepository;

    /**
     * Test the search for all registered contributors in database.
     */
    @Test
    public void testFindAll() {
        final List<Contributor> entities = this.contributorRepository.findAll();
        Assert.assertNotNull(entities);
        Assert.assertFalse(entities.isEmpty());
        Assert.assertEquals(EXPECTED_NUMBER_OF_CONTRIBUTORS, entities.size());
        entities.forEach(entity -> Assert.assertNotNull(entity.getId()));
    }

    /**
     * Test the persistence of a new {@link Contributor} with valid information.
     */
    @Test
    @Rollback
    public void testSaveWithValidInformation() throws IOException {
        // Get the mocked information to be used as base.
        final Contributor contributor = (Contributor) JSONUtil.fileToBean(ConfigurationCatalog.CONTRIBUTOR_FILE_PATH.getValue(), TypeFactory.defaultInstance().constructType(Contributor.class));
        contributor.setFiscalNumber(90909090L);
        // Performs the persistence of the new contributor.
        this.contributorRepository.save(contributor);
        // Verifies if the number of contributors were increased by 1.
        Assert.assertEquals(EXPECTED_NUMBER_OF_CONTRIBUTORS + 1, this.contributorRepository.findAll().size());
    }

    /**
     * Test the deletion of a existing {@link Contributor} with valid information.
     */
    @Test
    @Rollback
    public void testDeleteWithValidInformation() {
        // Get the entity to be deleted.
        final Contributor entity = this.contributorRepository.findOne(2L);
        Assert.assertNotNull(entity);
        // Performs the deletion of the new contributor.
        this.contributorRepository.delete(entity);
        // Verifies if the number of entities were decreased by 1.
        Assert.assertEquals(EXPECTED_NUMBER_OF_CONTRIBUTORS - 1, this.contributorRepository.findAll().size());
    }
}