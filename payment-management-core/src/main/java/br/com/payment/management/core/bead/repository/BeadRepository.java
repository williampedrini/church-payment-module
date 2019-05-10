package br.com.payment.management.core.bead.repository;

import br.com.payment.management.core.bead.model.Bead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * {@link Bead} Data Access Object.
 *
 * @author William Custodio
 */
public interface BeadRepository extends JpaRepository<Bead, Long> {

    /**
     * Find a certain bead by a contributor and a campaign.
     * @param campaignId The campaign identifier.
     * @param contributorId The contributor identifier.
     * @return The found bead.
     */
    Bead findByCampaign_IdAndContributor_Id(@Param("campaignId") Long campaignId, @Param("contributorId") Long contributorId);

    /**
     * Find a certain bead by its identification number and a campaign identifier.
     * @param identificationNumber The bead's custom identifier.
     * @param campaignId The campaign identifier.
     * @return The found bead.
     */
    Bead findByIdentificationNumberAndCampaign_Id(@Param("identificationNumber") String identificationNumber, @Param("campaignId") Long campaignId);

    /**
     * Find a certain bead by a bead identifier, contributor and a campaign.
     * @param id The bead identifier.
     * @param campaignId The campaign identifier.
     * @param contributorId The contributor identifier.
     * @return The found bead.
     */
    @Query("select e from Bead e where (:id is null or e.id <> :id) and e.campaign.id = :campaignId and e.contributor.id = :contributorId")
    Bead findByIdAndCampaignIdAndContributorId(@Param("id") Long id, @Param("campaignId") Long campaignId, @Param("contributorId") Long contributorId);
}
