package br.com.payment.management.core.common.configuration;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Class responsible for setting up the unit tests context.
 *
 * @author William Custodio
 */
@SpringBootApplication(scanBasePackages = {"br.com.payment.management.core"})
@EnableJpaRepositories("br.com.payment.management.core")
@EntityScan(basePackages = {"br.com.payment.management.core"}, basePackageClasses = {Jsr310JpaConverters.class})
public class TestRootConfig {
}