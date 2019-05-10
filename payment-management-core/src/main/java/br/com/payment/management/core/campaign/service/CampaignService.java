package br.com.payment.management.core.campaign.service;

import br.com.payment.management.core.bead.repository.BeadRepository;
import br.com.payment.management.core.campaign.model.Campaign;
import br.com.payment.management.core.contribution.repository.ContributionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Service responsible for handling processes related to a {@link Campaign}.
 *
 * @author williamcustodio
 */
@Service
@Transactional
public class CampaignService {

    private final BeadRepository beadRepository;

    private final ContributionRepository contributionRepository;

    @Autowired
    public CampaignService(final BeadRepository beadRepository, final ContributionRepository contributionRepository) {
        this.beadRepository = beadRepository;
        this.contributionRepository = contributionRepository;
    }

    /**
     * Delete all associations of a campaign.
     * @param campaign The campaign to be deleted.
     */
    public void deleteAssociations(final Campaign campaign) {
        this.beadRepository.delete(campaign.getBeads());
        this.contributionRepository.delete(campaign.getContributions());
    }
}
