package br.com.payment.management.core.common.exception;

import lombok.Getter;

/**
 * Represents a business exception that ocurred while executing the application.
 *
 * @author William Custodio
 */
public class BusinessException extends RuntimeException {

    /**
     * Catalog of possible exception types that a business exception can assume.
     */
    public enum Type {
        INFO, WARNING, ERROR
    }

    /**
     * The key used as an unique identifier for the error message.
     */
    @Getter
    private final String key;

    /**
     * The internal message that will be shown on the console.
     */
    @Getter
    private final String message;

    /**
     * The representation of the {@link Type} assumed by the current exception.
     */
    @Getter
    private final Type type;

    public BusinessException(final String key, final String message) {
        this(key, message, Type.ERROR);
    }

    public BusinessException(final String key, final String message,  final Type type) {
        super(message);
        this.key = key;
        this.message = message;
        this.type = type;
    }
}