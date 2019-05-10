package br.com.payment.management.core.campaign.service;

import br.com.payment.management.core.campaign.enumerable.ValidatorError;
import br.com.payment.management.core.campaign.model.Campaign;
import br.com.payment.management.core.campaign.repository.CampaignRepository;
import br.com.payment.management.core.common.exception.BusinessException;
import br.com.payment.management.core.common.service.CommonServiceValidator;
import br.com.payment.management.core.provingType.model.ProvingType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.transaction.Transactional;
import java.time.LocalDate;

/**
 * Service responsible for performing validations over a {@link Campaign}
 *
 * @author williamcustodio
 */
@Service
@Transactional
public class CampaignServiceValidator {

    private final CampaignRepository campaignRepository;

    private final CommonServiceValidator commonServiceValidator;

    @Autowired
    public CampaignServiceValidator(final CampaignRepository campaignRepository, final CommonServiceValidator commonServiceValidator) {
        this.campaignRepository = campaignRepository;
        this.commonServiceValidator = commonServiceValidator;
    }

    /**
     * Validate the campaign before creating.
     * @param campaign The campaign to be validated.
     */
    public void validateBeforeCreate(final Campaign campaign) {
        this.validateMandatoryFields(campaign);
    }

    /**
     * Validate the campaign before updating.
     * @param campaign The campaign to be validated.
     */
    public void validateBeforeUpdate(final Campaign campaign) {

        this.validateMandatoryFields(campaign);

        // Get the current value for the campaign on the database.
        final Campaign oldCampaign = this.campaignRepository.findOne(campaign.getId());

        if(this.wasProvingTypeChanged(oldCampaign.getProvingType(), campaign.getProvingType())) {
            final String error = String.format(ValidatorError.PROVING_TYPE_CHANGED.getMessage(), campaign.getId());
            throw new BusinessException(ValidatorError.PROVING_TYPE_CHANGED.getKey(), error);
        }
    }

    /**
     * Validate all the mandatory campaign mandatory fields.
     * @param campaign The campaign to be validated.
     */
    private void validateMandatoryFields(final Campaign campaign) {
        this.validateDateRange(campaign);
        if(this.existCampaignWithName(campaign.getId(), campaign.getName())) {
            final String error = String.format(ValidatorError.DUPLICATED_NAME.getMessage(), campaign.getName());
            throw new BusinessException(ValidatorError.DUPLICATED_NAME.getKey(), error);
        }
    }

    /**
     * Validate all the date fields associated to the campaign.
     * @param campaign The campaign to be validated.
     */
    private void validateDateRange(final Campaign campaign) {
        if(this.isDateRangeInvalid(campaign.getInitialDate(), campaign.getFinalDate())) {
            final String error = String.format(ValidatorError.DATE_RANGE_INVALID.getMessage(),
                    campaign.getInitialDate().toString(), campaign.getFinalDate().toString(), campaign.getName());
            throw new BusinessException(ValidatorError.DATE_RANGE_INVALID.getKey(), error);
        }
    }

    /**
     * Verifies whether a proving type was changed.
     * @param currentProvingType The current proving type to be updated.
     * @param newProvingType The new value to be persisted.
     * @return <code>true</code>: The proving type is invalid. </br>
     *         <code>false</code>: The proving type is valid.
     */
    private boolean wasProvingTypeChanged(ProvingType currentProvingType, ProvingType newProvingType) {
        return !currentProvingType.equals(newProvingType);
    }

    /**
     * Verifies whether a range of date is correct.
     * @param begin The beginning of the range.
     * @param end The endDate of the range.
     * @return <code>true</code>: The range is invalid. </br>
     *         <code>false</code>: The range is valid.
     */
    private boolean isDateRangeInvalid(final LocalDate begin, final LocalDate end) {
        return end != null && this.commonServiceValidator.isDateRangeInvalid(begin, end);
    }

    /**
     * Verifies if there is a campaign with the same name defined at the parameter.
     * @param id The campaign's identifier.
     * @param name The campaign's name.
     * @return <code>true</code>: There is a campaign with the name. </br>
     *         <code>false</code>: There is no campaign with the given name.
     */
    private boolean existCampaignWithName(final Long id, final String name) {
        return !ObjectUtils.isEmpty(this.campaignRepository.findByIdAndName(id, name));
    }
}