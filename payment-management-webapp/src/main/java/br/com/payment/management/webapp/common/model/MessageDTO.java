package br.com.payment.management.webapp.common.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MessageDTO {

    /**
     * Catalog of possible exception types that a business exception can assume.
     */
    public enum Type {
        INFO, WARNING, ERROR
    }

    /**
     * The key used as an unique identifier for the error message.
     */
    @JsonProperty
    private final String key;

    /**
     * The internal message that will be shown on the console.
     */
    @JsonProperty
    private final String message;

    @JsonProperty
    private final Type type;

    public MessageDTO(final String key, final String message, final Type type) {
        this.key = key;
        this.message = message;
        this.type = type;
    }

    public MessageDTO(final String key, final String message) {
        this.key = key;
        this.message = message;
        this.type = Type.ERROR;
    }
}