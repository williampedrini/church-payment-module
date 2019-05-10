package br.com.payment.management.security.common.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

/**
 * Class responsible for setting up the security options.
 *
 * @author William Custodio
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final DataSource dataSource;

    private final SecurityParameter parameters;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	public SecurityConfiguration(DataSource dataSource, SecurityParameter parameters, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.dataSource = dataSource;
		this.parameters = parameters;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	/**
     * This section defines the user accounts which can be used for
     * authentication as well as the roles each user has.
     */
    @Override
    public void configure(final AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.jdbcAuthentication()
            .usersByUsernameQuery(this.parameters.getUsersQuery())
            .authoritiesByUsernameQuery(this.parameters.getRolesQuery())
            .dataSource(this.dataSource)
            .passwordEncoder(this.bCryptPasswordEncoder);
    }

    /**
     * This section defines the security policy for the app.
     * - BASIC authentication is supported (enough for this REST-based demo)
     * - /employees is secured using URL security shown below
     * - CSRF headers are disabled since we are only testing the REST interface,
     *   not a web one.
     *
     * NOTE: GET is not shown which defaults to permitted.
     */
    @Override
    protected void configure(final HttpSecurity httpSecurity) throws Exception {
        httpSecurity.httpBasic().and()
            .authorizeRequests()
            .antMatchers(this.parameters.getLoginUrl()).permitAll()
            .antMatchers(this.parameters.getAdminRoleSecuredApiUrl()).hasAuthority(this.parameters.getAdminRole()).anyRequest()
            .authenticated().and().csrf().disable().formLogin()
            .loginPage(this.parameters.getLoginUrl()).failureUrl(this.parameters.getLoginErrorUrl())
            .defaultSuccessUrl(this.parameters.getLoginSuccessUrl())
            .usernameParameter("username")
            .passwordParameter("password")
            .and().logout()
            .logoutRequestMatcher(new AntPathRequestMatcher(this.parameters.getLogoutUrl()))
            .logoutSuccessUrl(this.parameters.getLoginUrl()).and().exceptionHandling()
            .accessDeniedPage(this.parameters.getLoginAccessDeniedUrl());
    }

    @Override
    public void configure(final WebSecurity webSecurity) {
        webSecurity.ignoring().antMatchers(this.parameters.getIgnoredUrl());
    }
}
