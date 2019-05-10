package br.com.payment.management.core.provingType.repository;

import br.com.payment.management.core.common.configuration.BaseTestRunner;
import br.com.payment.management.core.provingType.model.ProvingType;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Class responsible for executing unit tests for {@link ProvingTypeRepository}.
 *
 * @author William Custodio
 */
@Transactional
public class ProvingTypeRepositoryTest extends BaseTestRunner {

    /**
     * Expected results used by the unit tests.
     */
    private static final int EXPECTED_PROVING_TYPES = 2;

    @Autowired
    private ProvingTypeRepository provingTypeRepository;

    /**
     * Test the search for all registered proving types in database.
     */
    @Test
    public void testFindAll() {
        final List<ProvingType> entities = this.provingTypeRepository.findAll();
        Assert.assertNotNull(entities);
        Assert.assertFalse(entities.isEmpty());
        Assert.assertEquals(EXPECTED_PROVING_TYPES, entities.size());
        entities.forEach(entity -> Assert.assertNotNull(entity.getId()));
    }
}