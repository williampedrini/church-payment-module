package br.com.payment.management.webapp.bead.validator;

import br.com.payment.management.core.bead.model.Bead;
import br.com.payment.management.core.bead.service.BeadServiceValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Validator responsible for performing custom validations before saving a {@link Bead}.
 *
 * @author William Custodio
 */
@Component("beforeSaveBeadValidator")
public class BeforeSaveBeadValidator implements Validator {

    @Autowired
    private BeadServiceValidator beadServiceValidator;

    @Override
    public boolean supports(final Class<?> clazz) {
        return Bead.class.equals(clazz);
    }

    @Override
    public void validate(final Object target, final Errors errors) {
        this.beadServiceValidator.validateBeforeUpdate((Bead) target);
    }
}