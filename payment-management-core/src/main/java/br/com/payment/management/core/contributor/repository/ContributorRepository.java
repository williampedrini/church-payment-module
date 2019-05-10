package br.com.payment.management.core.contributor.repository;

import br.com.payment.management.core.contributor.model.Contributor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

/**
 * {@link Contributor} Data Access Object.
 *
 * @author William Custodio
 */
public interface ContributorRepository extends JpaRepository<Contributor, Long> {

    /**
     * Find all existing contributors that have their identifier inside the defined list.
     * @param ids The list with all possible contributors.
     * @return The found contributors.
     */
    List<Contributor> findAllByIdIn(List<Long> ids);
}