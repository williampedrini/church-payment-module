package br.com.payment.management.webapp.common.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * The response used to represent an error that happened while processing some request.
 *
 * @author William Custodio
 */
public class ErrorResponseDTO {

    /**
     * The http status that the current exception represents.
     */
    private final HttpStatus status;

    /**
     * The timestamp representing when the error happened.
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private final LocalDateTime timestamp;

    /**
     * The messages used as an unique identifier for the error messages.
     */
    private final List<MessageDTO> messages = new ArrayList<>();

    public ErrorResponseDTO(final HttpStatus status, final MessageDTO... keys) {
        this.status = status;
        this.timestamp = LocalDateTime.now();
        this.messages.addAll(Arrays.asList(keys));
    }

    public ErrorResponseDTO(final MessageDTO... keys) {
        this(HttpStatus.BAD_REQUEST, keys);
    }

    public ErrorResponseDTO(final Throwable exception) {
        this();
        this.messages.add(new MessageDTO("application.error.unknown", exception.getLocalizedMessage(), MessageDTO.Type.ERROR));
    }

    public List<MessageDTO> getMessages() {
        return this.messages;
    }
}