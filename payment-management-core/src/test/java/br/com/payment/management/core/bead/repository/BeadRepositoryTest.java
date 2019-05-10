package br.com.payment.management.core.bead.repository;

import br.com.payment.management.core.bead.model.Bead;
import br.com.payment.management.core.common.configuration.BaseTestRunner;
import br.com.payment.management.core.common.enumerable.ConfigurationCatalog;
import br.com.payment.management.core.common.util.JSONUtil;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * Class responsible for executing unit tests for {@link BeadRepository}.
 *
 * @author William Custodio
 */
@Transactional
public class BeadRepositoryTest extends BaseTestRunner {

    /**
     * Expected results used by the unit tests.
     */
    private static final int EXPECTED_NUMBER_OF_BEADS = 1;
    private static final int EXPECTED_NUMBER_OF_CONTRIBUTIONS = 1;

    @Autowired
    private BeadRepository beadRepository;

    /**
     * Test the search for all registered beads in database.
     */
    @Test
    public void testFindAll() {

        final List<Bead> entities = this.beadRepository.findAll();
        Assert.assertNotNull(entities);
        Assert.assertFalse(entities.isEmpty());
        Assert.assertEquals(EXPECTED_NUMBER_OF_BEADS, entities.size());

        entities.forEach(entity -> {
            Assert.assertNotNull(entity.getId());
            Assert.assertNotNull(entity.getCampaign());
            Assert.assertNotNull(entity.getContributor());
            Assert.assertNotNull(entity.getContributions());
            Assert.assertFalse(entity.getContributions().isEmpty());
            Assert.assertEquals(EXPECTED_NUMBER_OF_CONTRIBUTIONS, entity.getContributions().size());
        });
    }

    /**
     * Test the persistence of a new {@link Bead} with valid information.
     */
    @Test
    @Rollback
    public void testSaveWithValidInformation() throws IOException {
        // Get the mocked information to be used as base.
        final Bead bead = (Bead) JSONUtil.fileToBean(ConfigurationCatalog.BEAD_FILE_PATH.getValue(), TypeFactory.defaultInstance().constructType(Bead.class));
        // Performs the persistence of the new bead.
        this.beadRepository.save(bead);
        // Verifies if the number of beads were increased by 1.
        Assert.assertEquals(EXPECTED_NUMBER_OF_BEADS + 1, this.beadRepository.findAll().size());
    }

    /**
     * Test the deletion of a existing {@link Bead} with valid information.
     */
    @Test
    @Rollback
    public void testDeleteWithValidInformation() {
        // Get the entity to be deleted.
        final List<Bead> entities = this.beadRepository.findAll();
        final Optional<Bead> entity = entities.stream().findFirst();
        Assert.assertTrue(entity.isPresent());
        // Performs the deletion of the new bead.
        this.beadRepository.delete(entity.get());
        // Verifies if the number of entities were decreased by 1.
        Assert.assertEquals(EXPECTED_NUMBER_OF_BEADS - 1, this.beadRepository.findAll().size());
    }
}