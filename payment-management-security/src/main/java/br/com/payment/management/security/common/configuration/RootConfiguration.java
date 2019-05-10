package br.com.payment.management.security.common.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Class responsible for the main application's configuration.
 *
 * @author William Custodio
 */
@Configuration
public class RootConfiguration {

    /**
     * Defines the Encoder used to encode the password in the database.
     * @return The {@link PasswordEncoder} used to encode the passwords.
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}