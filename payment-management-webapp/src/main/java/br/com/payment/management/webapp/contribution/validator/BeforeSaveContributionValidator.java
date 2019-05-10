package br.com.payment.management.webapp.contribution.validator;

import br.com.payment.management.core.contribution.model.Contribution;
import br.com.payment.management.core.contribution.service.ContributionServiceValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Validator responsible for performing custom validations before saving a {@link br.com.payment.management.core.contribution.model.Contribution}.
 *
 * @author William Custodio
 */
@Component("beforeSaveContributionValidator")
public class BeforeSaveContributionValidator implements Validator {

    @Autowired
    private ContributionServiceValidator contributionServiceValidator;

    @Override
    public boolean supports(final Class<?> clazz) {
        return Contribution.class.equals(clazz);
    }

    @Override
    public void validate(final Object target, final Errors errors) {
        this.contributionServiceValidator.validateBeforeUpdate((Contribution) target);
    }
}