package br.com.payment.management.webapp.common.controller;

import br.com.payment.management.core.common.exception.BusinessException;
import br.com.payment.management.webapp.common.model.ErrorResponseDTO;
import br.com.payment.management.webapp.common.model.MessageDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Controller responsible for handling all the exceptions for a better way of showing the messages.
 *
 * @author William Custodio
 */
@Slf4j
@ControllerAdvice
public class ExceptionHandlerController {

    /**
     * Handle all the unexpected exceptions and map them into a general exception response.
     * @param runtimeException The exception to be mapped.
     * @return The built response for the user.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponseDTO> runtimeException(final RuntimeException runtimeException) {
        final ErrorResponseDTO response = new ErrorResponseDTO(runtimeException);
        log.error(runtimeException.getLocalizedMessage(), runtimeException);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle an {@link javax.validation.ConstraintViolationException} and map it into a response.
     * @param constraintViolationException The exception to be mapped.
     * @return The built response for the user.
     */
    @ExceptionHandler(javax.validation.ConstraintViolationException.class)
    public ResponseEntity<ErrorResponseDTO> constraintViolationException(final javax.validation.ConstraintViolationException constraintViolationException) {
        final ErrorResponseDTO response = new ErrorResponseDTO();
        constraintViolationException.getConstraintViolations().forEach(violation ->
            response.getMessages().add(new MessageDTO(violation.getMessage(), constraintViolationException.getLocalizedMessage()))
        );
        log.error(constraintViolationException.getLocalizedMessage(), constraintViolationException);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle an {@link org.hibernate.exception.ConstraintViolationException} and map it into a response.
     * @param constraintViolationException The exception to be mapped.
     * @return The built response for the user.
     */
    @ExceptionHandler(org.hibernate.exception.ConstraintViolationException.class)
    public ResponseEntity<ErrorResponseDTO> constraintViolationException(final org.hibernate.exception.ConstraintViolationException constraintViolationException) {
        final MessageDTO message = new MessageDTO(constraintViolationException.getMessage(), constraintViolationException.getLocalizedMessage());
        final ErrorResponseDTO response = new ErrorResponseDTO(message);
        log.error(constraintViolationException.getLocalizedMessage(), constraintViolationException);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle an {@link BusinessException} and map it into a response.
     * @param businessException The exception to be mapped.
     * @return The built response for the user.
     */
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponseDTO> businessException(final BusinessException businessException) {
        final MessageDTO message = new MessageDTO(businessException.getKey(), businessException.getMessage(), MessageDTO.Type.valueOf(businessException.getType().name()));
        final ErrorResponseDTO response = new ErrorResponseDTO(message);
        log.error(businessException.getMessage(), businessException);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle an {@link ResourceNotFoundException} and map it into a response.
     * @param resourceNotFoundException The exception to be mapped.
     * @return The built response for the user.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> resourceNotFoundException(final ResourceNotFoundException resourceNotFoundException) {
        final MessageDTO message = new MessageDTO("application.error.resource.notFound", resourceNotFoundException.getMessage(), MessageDTO.Type.WARNING);
        final ErrorResponseDTO response = new ErrorResponseDTO(message);
        log.error(resourceNotFoundException.getMessage(), resourceNotFoundException);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
