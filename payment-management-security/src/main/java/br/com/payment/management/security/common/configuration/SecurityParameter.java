package br.com.payment.management.security.common.configuration;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * Class responsible for reading the security options from 'application.yml' file.
 *
 * @author William Custodio
 */
@Configuration
public class SecurityParameter {

  @Getter
  @Value("${spring.security.queries.users}")
  private String usersQuery;

  @Getter
  @Value("${spring.security.queries.roles}")
  private String rolesQuery;

  @Getter
  @Value("${spring.security.login.url}")
  private String loginUrl;

  @Getter
  @Value("${spring.security.login.error-url}")
  private String loginErrorUrl;

  @Getter
  @Value("${spring.security.login.success-url}")
  private String loginSuccessUrl;

  @Getter
  @Value("${spring.security.login.access-denied-url}")
  private String loginAccessDeniedUrl;

  @Getter
  @Value("${spring.security.logout.url}")
  private String logoutUrl;

  @Getter
  @Value("${spring.security.role.admin.mnemonic}")
  private String adminRole;

  @Getter
  @Value("${spring.security.role.admin.secured-api-url}")
  private String adminRoleSecuredApiUrl;

  @Getter
  @Value("${spring.security.ignored-url}")
  private String ignoredUrl;
}
