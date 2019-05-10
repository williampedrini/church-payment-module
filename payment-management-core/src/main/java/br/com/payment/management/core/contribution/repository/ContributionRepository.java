package br.com.payment.management.core.contribution.repository;

import br.com.payment.management.core.contribution.model.Contribution;
import br.com.payment.management.core.contributor.model.Contributor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

/**
 * {@link Contribution} Data Access Object.
 *
 * @author William Custodio
 */
public interface ContributionRepository extends JpaRepository<Contribution, Long> {

    /**
     * Find all existing contributions that have their identifier inside the defined list.
     * @param ids The list with all possible contributions.
     * @return The found contributions.
     */
    List<Contribution> findAllByIdIn(List<Long> ids);

    /**
     * Find all contributions by the name of a contributor, campaign and the creation date.
     * @param campaignName The name of the campaign.
     * @param contributorName The name of the contributor.
     * @param beginCreationDate The beginning of a creation date range for a contribution.
     * @param endCreationDate The endDate of a creation date range for a contribution.
     * @return The found list of {@link Contribution}.
     */
    @Query("select distinct e from Contribution e " +
            "inner join e.contributor c " +
            "left join c.beads b " +
            "where ( :beadIdentificationNumber is null or (:beadIdentificationNumber is not null and " +
            "upper(b.identificationNumber) like concat('%',upper(:beadIdentificationNumber),'%') ) ) " +
            "and ( :campaignName is null or upper(e.campaign.name) like concat('%',upper(:campaignName),'%') ) " +
            "and ( :contributorName is null or upper(e.contributor.name) like concat('%',upper(:contributorName),'%') ) " +
            "and ( ( ( :beginCreationDate is not null and :endCreationDate is not null ) and ( e.creationDate between :beginCreationDate and :endCreationDate) ) " +
            " or ( ( :beginCreationDate is not null and :endCreationDate is null ) and e.creationDate >= :beginCreationDate ) " +
            " or ( ( :beginCreationDate is null and :endCreationDate is not null ) and e.creationDate <= :endCreationDate ) " +
            " or ( :beginCreationDate is null and :endCreationDate is null ) ) ")
    List<Contribution> findAll(
            @Param("beadIdentificationNumber") String beadIdentificationNumber,
            @Param("campaignName") String campaignName,
            @Param("contributorName") String contributorName,
            @Param("beginCreationDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate beginCreationDate,
            @Param("endCreationDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endCreationDate,
            Pageable pageable
    );

    /**
     * Find all existing contributions for a specific campaign and contributor.
     * @param campaignId The campaign's identifier.
     * @param contributorId The contributor's identifier.
     * @return The list of all found contributions.
     */
    @Query("select e from Contribution e where e.campaign.id = :campaignId and e.contributor.id = :contributorId")
    List<Contribution> findAllByCampaignIdAndContributorId(@Param("campaignId") Long campaignId,
                                                           @Param("contributorId") Long contributorId);
}