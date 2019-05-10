package br.com.payment.management.core.provingType.repository;

import br.com.payment.management.core.provingType.model.ProvingType;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * {@link ProvingType} Data Access Object.
 *
 * @author William Custodio
 */
public interface ProvingTypeRepository extends JpaRepository<ProvingType, Long> {
}