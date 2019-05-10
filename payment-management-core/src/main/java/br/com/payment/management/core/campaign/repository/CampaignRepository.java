package br.com.payment.management.core.campaign.repository;

import br.com.payment.management.core.campaign.model.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

/**
 * {@link Campaign} Data Access Object.
 *
 * @author William Custodio
 */
public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    /**
     * Find existing campaign by its name and identifier.
     * @param id The campaign's identifier.
     * @param name The name to be used.
     * @return The list with all found campaigns.
     */
    @RestResource(exported=false)
    @Query("select e from Campaign e where (:id is null or :id <> e.id) and upper(e.name) = upper(:name)")
    Campaign findByIdAndName(@Param("id") Long id, @Param("name") String name);

    /**
     * Find all campaigns by its name.
     * @param name The name of the campaigns to be searched.
     * @return The found list of {@link Campaign}.
     */
    @Query("select e from Campaign e where :name is null or upper(e.name) like concat('%',upper(:name),'%') order by e.id desc")
    List<Campaign> findAll(@Param("name") String name);

    /**
     * Find all existing campaigns that has a certain type.
     * @param provingType The proving type mnemonic. Ex: TLO - Talão.
     * @return The list of found campaigns.
     */
    @Query("select e from Campaign e where e.provingType.mnemonic = :provingType order by e.name asc")
    List<Campaign> findAllByProvingType(@Param("provingType") String provingType);
}