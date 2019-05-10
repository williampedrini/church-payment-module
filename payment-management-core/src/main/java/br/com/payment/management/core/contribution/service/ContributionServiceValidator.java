package br.com.payment.management.core.contribution.service;

import br.com.payment.management.core.bead.repository.BeadRepository;
import br.com.payment.management.core.campaign.model.Campaign;
import br.com.payment.management.core.common.exception.BusinessException;
import br.com.payment.management.core.common.service.CommonServiceValidator;
import br.com.payment.management.core.contribution.enumerable.ValidatorError;
import br.com.payment.management.core.contribution.model.Contribution;
import br.com.payment.management.core.contributor.model.Contributor;
import br.com.payment.management.core.provingType.enumerable.ProvingTypeCatalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;

/**
 * Service responsible for performing validations over a {@link Contribution}
 *
 * @author williamcustodio
 */
@Service
@Transactional
public class ContributionServiceValidator {

    private final BeadRepository beadRepository;

    private final CommonServiceValidator commonServiceValidator;

    @Autowired
    public ContributionServiceValidator(final BeadRepository beadRepository, final CommonServiceValidator commonServiceValidator) {
        this.beadRepository = beadRepository;
        this.commonServiceValidator = commonServiceValidator;
    }

    /**
     * Performs validations before creating a contribution.
     * @param contribution The contribution to be validated.
     */
    public void validateBeforeCreate(final Contribution contribution) {
        this.validateMandatoryFields(contribution);
    }

    /**
     * Performs validations before updating a contribution.
     * @param contribution The contribution to be validated.
     */
    public void validateBeforeUpdate(final Contribution contribution) {
        this.validateMandatoryFields(contribution);
    }

    /**
     * Validate all the mandatory contribution mandatory fields.
     * @param contribution The contribution to be validated.
     */
    private void validateMandatoryFields(final Contribution contribution) {
        if(this.isBeadAssociationNotFound(contribution.getCampaign(), contribution.getContributor())) {
            final String error = String.format(ValidatorError.BEAD_ASSOCIATION_EMPTY.getMessage(), contribution.getId());
            throw new BusinessException(ValidatorError.BEAD_ASSOCIATION_EMPTY.getKey(), error);
        }
        if(this.isCampaignExpired(contribution.getCampaign())) {
            final String error = String.format(ValidatorError.EXPIRED_CAMPAIGN.getMessage(), contribution.getCampaign().getId());
            throw new BusinessException(ValidatorError.EXPIRED_CAMPAIGN.getKey(), error);
        }
        if(this.isCreationDateInvalid(contribution)) {
            final String error = String.format(ValidatorError.INVALID_CREATION_DATE.getMessage(), contribution.getCampaign().getId());
            throw new BusinessException(ValidatorError.INVALID_CREATION_DATE.getKey(), error);
        }
    }

    /**
     * Verifies whether a contribution has or not a bead associated to it.
     * @param campaign The campaign which the bead will be associated.
     * @param contributor The contributor owner of the contribution.
     * @return <code>true</code>: Does not have a bead. </br>
     *         <code>false</code>: Does have a bead.
     */
    private boolean isBeadAssociationNotFound(final Campaign campaign, final Contributor contributor) {
        return ProvingTypeCatalog.TLO.name().equals(campaign.getProvingType().getMnemonic())
                && this.beadRepository.findByCampaign_IdAndContributor_Id(campaign.getId(), contributor.getId()) == null;
    }

    /**
     * Verifies whether a campaign is or not expired.
     * @param campaign The campaign which the bead will be associated.
     * @return <code>true</code>: The campaign is expired. </br>
     *         <code>false</code>: The campaign is not expired.
     */
    private boolean isCampaignExpired(final Campaign campaign) {
        return campaign.getFinalDate() != null && LocalDate.now().isAfter(campaign.getFinalDate());
    }

    /**
     * Verifies whether the creation date is or not valid.
     * @param contribution The contribution to be validated
     * @return <code>true</code>: The creation date is invalid. </br>
     *         <code>false</code>: The creation date is valid.
     */
    private boolean isCreationDateInvalid(final Contribution contribution) {
        return contribution.getCampaign().getFinalDate() != null &&
                this.commonServiceValidator.isDateRangeInvalid(contribution.getCreationDate(),
                        contribution.getCampaign().getFinalDate());
    }
}