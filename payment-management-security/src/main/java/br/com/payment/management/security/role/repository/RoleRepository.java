package br.com.payment.management.security.role.repository;

import br.com.payment.management.security.role.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * {@link Role} Data Access Object.
 *
 * @author William Custodio
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
}