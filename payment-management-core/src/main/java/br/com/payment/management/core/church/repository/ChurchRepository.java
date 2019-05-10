package br.com.payment.management.core.church.repository;

import br.com.payment.management.core.church.model.Church;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * {@link Church} Data Access Object.
 *
 * @author William Custodio
 */
public interface ChurchRepository extends JpaRepository<Church, Long> {
}
