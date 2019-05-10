package br.com.payment.management.core.common.service;

import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDate;

/**
 * Service responsible for performing validations.
 *
 * @author williamcustodio
 */
@Service
public class CommonServiceValidator {

    /**
     * Verifies whether a range of date is correct.
     * @param begin The beginning of the range.
     * @param end The ending of the range.
     * @return <code>true</code>: The range is invalid. </br>
     *         <code>false</code>: The range is not valid.
     */
    public boolean isDateRangeInvalid(final LocalDate begin, final LocalDate end) {
        return !ObjectUtils.isEmpty(begin) && !ObjectUtils.isEmpty(end) && begin.isAfter(end);
    }

    /**
     * Verifies if a certain date is between a range or not.
     * @param date The date to be validated.
     * @param begin The initial part of the range.
     * @param end The final part of the range.
     * @return <code>true</code>: The date is between. </br>
     *         <code>false</code>: The date is not between.
     */
    public boolean isBetween(final LocalDate date, final LocalDate begin, final LocalDate end) {
        return (date.isAfter(begin) || date.equals(begin)) && (date.isBefore(end) || date.equals(end));
    }
}