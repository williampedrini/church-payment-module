package br.com.payment.management.core.bead.service;

import br.com.payment.management.core.bead.model.Bead;
import br.com.payment.management.core.contribution.model.Contribution;
import br.com.payment.management.core.contribution.repository.ContributionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Service responsible for handling processes related to a {@link br.com.payment.management.core.bead.model.Bead}.
 *
 * @author williamcustodio
 */
@Service
@Transactional
public class BeadService {

    @Autowired
    private ContributionRepository contributionRepository;

    /**
     * Delete all associations of a bead.
     * @param bead The bead to be deleted.
     */
    public void deleteAssociations(final Bead bead) {
        final List<Contribution> contributions = this.contributionRepository
                .findAllByCampaignIdAndContributorId(bead.getCampaign().getId(), bead.getContributor().getId());
        this.contributionRepository.delete(contributions);
    }
}
