package br.com.payment.management.core.bead.service;

import br.com.payment.management.core.bead.enumerable.ValidatorError;
import br.com.payment.management.core.bead.model.Bead;
import br.com.payment.management.core.bead.repository.BeadRepository;
import br.com.payment.management.core.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.transaction.Transactional;

/**
 * Service responsible for performing validations over a {@link br.com.payment.management.core.bead.model.Bead}
 *
 * @author williamcustodio
 */
@Service
@Transactional
public class BeadServiceValidator {

    @Autowired
    private BeadRepository beadRepository;

    /**
     * Validate the bead before creating.
     * @param bead The bead to be validated.
     */
    public void validateBeforeCreate(final Bead bead) {
        this.validateMandatoryFields(bead);
    }

    /**
     * Validate the bead before updating.
     * @param bead The bead to be validated.
     */
    public void validateBeforeUpdate(final Bead bead) {
        this.validateMandatoryFields(bead);
    }

    /**
     * Validate all the mandatory bead mandatory fields.
     * @param bead The bead to be validated.
     */
    private void validateMandatoryFields(final Bead bead) {
        if(this.existsBeadForCampaignAndContributor(bead.getId(), bead.getCampaign().getId(), bead.getContributor().getId())) {
            final String error = String.format(ValidatorError.DUPLICATED.getMessage(),
                    bead.getCampaign().getId(), bead.getContributor().getId());
            throw new BusinessException(ValidatorError.DUPLICATED.getKey(), error);
        }
    }

    /**
     * Verifies if there is a bead with the same contributor and campaign.
     * @param id The bead identifier.
     * @param campaignId The campaign identifier.
     * @param contributorId The contributor identifier.
     * @return <code>true</code>: There is a bead. </br>
     *         <code>false</code>: There is no bead.
     */
    private boolean existsBeadForCampaignAndContributor(final Long id, final Long campaignId, final Long contributorId) {
        return !ObjectUtils.isEmpty(this.beadRepository.findByIdAndCampaignIdAndContributorId(id, campaignId, contributorId));
    }
}