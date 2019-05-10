package br.com.payment.management.core.contributor.service;

import br.com.payment.management.core.common.exception.BusinessException;
import br.com.payment.management.core.contributor.enumerable.CivilStateType;
import br.com.payment.management.core.contributor.enumerable.ValidatorError;
import br.com.payment.management.core.contributor.model.Contributor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

/**
 * Service responsible for performing validations over a {@link Contributor}
 *
 * @author williamcustodio
 */
@Service
@Transactional
public class ContributorServiceValidator {

    /**
     * Performs validations before creating a contributor.
     * @param contributor The contributor to be validated.
     */
    public void validateBeforeCreate(final Contributor contributor) {
        this.validateMandatoryFields(contributor);
    }

    /**
     * Performs validations before updating a contributor.
     * @param contributor The contributor to be validated.
     */
    public void validateBeforeUpdate(final Contributor contributor) {
        this.validateMandatoryFields(contributor);
    }

    /**
     * Validate all the mandatory contributor mandatory fields.
     * @param contributor The contributor to be validated.
     */
    private void validateMandatoryFields(final Contributor contributor) {
        if(this.isMarriageDateInvalid(contributor)) {
            final String error = String.format(ValidatorError.MARRIAGE_DATE_EMPTY.getMessage(), contributor.getCivilState());
            throw new BusinessException(ValidatorError.MARRIAGE_DATE_EMPTY.getKey(), error);
        }
        if(this.isPartnerNameInvalid(contributor)) {
            final String error = String.format(ValidatorError.PARTNER_NAME_EMPTY.getMessage(), contributor.getCivilState());
            throw new BusinessException(ValidatorError.PARTNER_NAME_EMPTY.getKey(), error);
        }
    }

    /**
     * Verifies whether the contributors marriage date is valid or not.
     * @param contributor The contributor to be validated.
     * @return <code>true</code>: The marriage date is invalid. </br>
     *         <code>false</code>: The marriage date is valid.
     */
    private boolean isMarriageDateInvalid(final Contributor contributor) {
        final List<CivilStateType> mandatoryCivilStates = Arrays.asList(CivilStateType.MARRIED, CivilStateType.STABLE_UNION);
        return mandatoryCivilStates.contains(contributor.getCivilState()) && contributor.getMarriageDate() == null;
    }

    /**
     * Verifies whether the contributors partner name is valid or not.
     * @param contributor The contributor to be validated.
     * @return <code>true</code>: The partner name is invalid. </br>
     *         <code>false</code>: The partner name is valid.
     */
    private boolean isPartnerNameInvalid(final Contributor contributor) {
        final List<CivilStateType> mandatoryCivilStates = Arrays.asList(CivilStateType.MARRIED, CivilStateType.STABLE_UNION);
        return mandatoryCivilStates.contains(contributor.getCivilState()) && StringUtils.isEmpty(contributor.getPartnerName());
    }
}