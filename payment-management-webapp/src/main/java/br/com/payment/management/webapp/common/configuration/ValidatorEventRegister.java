package br.com.payment.management.webapp.common.configuration;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.validation.Validator;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Class responsible for initializing all the {@link Validator} responsible for performing validations before a object is created.
 *
 * @see <a href="https://jira.spring.io/browse/DATAREST-524">Validator auto discovery not working for Spring Data Rest</a>
 *
 * @author William Custodio
 */
@Configuration
public class ValidatorEventRegister implements InitializingBean {

    @Autowired
    private ValidatingRepositoryEventListener validatingRepositoryEventListener;

    @Autowired
    private Map<String, Validator> validators;

    @Override
    public void afterPropertiesSet() {
        final List<String> events = Arrays.asList("beforeCreate", "beforeSave");
        for (Map.Entry<String, Validator> validator : validators.entrySet()) {
            events.stream().filter(event -> validator.getKey().startsWith(event)).findFirst().ifPresent(event -> validatingRepositoryEventListener.addValidator(event, validator.getValue()));
        }
    }
}

