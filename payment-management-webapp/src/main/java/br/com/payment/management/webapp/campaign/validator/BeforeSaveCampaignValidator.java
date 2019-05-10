package br.com.payment.management.webapp.campaign.validator;

import br.com.payment.management.core.campaign.model.Campaign;
import br.com.payment.management.core.campaign.service.CampaignServiceValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Validator responsible for performing custom validations before saving a {@link Campaign}.
 *
 * @author William Custodio
 */
@Component("beforeSaveCampaignValidator")
public class BeforeSaveCampaignValidator implements Validator {

    @Autowired
    private CampaignServiceValidator campaignServiceValidator;

    @Override
    public boolean supports(final Class<?> clazz) {
        return Campaign.class.equals(clazz);
    }

    @Override
    public void validate(final Object target, final Errors errors) {
        this.campaignServiceValidator.validateBeforeUpdate((Campaign) target);
    }
}