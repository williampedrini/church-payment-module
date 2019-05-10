package br.com.payment.management.webapp.campaign.event;

import br.com.payment.management.core.campaign.model.Campaign;
import br.com.payment.management.core.campaign.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

/**
 * Event handler responsible for handling operation associated to a {@link br.com.payment.management.core.campaign.repository.CampaignRepository}
 *
 * @author williamcustodio
 */
@RepositoryEventHandler(value = Campaign.class)
public class CampaignEventHandler {

    @Autowired
    private CampaignService campaignService;

    /**
     * Execute processes before the deletion of a campaign.
     * @param campaign The campaign to be deleted.
     */
    @HandleBeforeDelete
    public void handleBeforeDelete(final Campaign campaign) {
        this.campaignService.deleteAssociations(campaign);
    }
}