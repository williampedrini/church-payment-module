package br.com.payment.management.security.user.repository;

import br.com.payment.management.security.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * {@link User} Data Access Object.
 *
 * @author William Custodio
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Delete a certain user by its username.
     * @param username The user's identifier.
     * @return The found user.
     */
    User findByUsername(String username);
}