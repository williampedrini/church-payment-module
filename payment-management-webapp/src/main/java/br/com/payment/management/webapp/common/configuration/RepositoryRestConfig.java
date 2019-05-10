package br.com.payment.management.webapp.common.configuration;

import br.com.payment.management.core.bead.model.Bead;
import br.com.payment.management.core.campaign.model.Campaign;
import br.com.payment.management.core.church.model.Church;
import br.com.payment.management.core.contribution.model.Contribution;
import br.com.payment.management.core.contributor.model.Contributor;
import br.com.payment.management.core.provingType.model.ProvingType;
import br.com.payment.management.webapp.bead.event.BeadEventHandler;
import br.com.payment.management.webapp.campaign.event.CampaignEventHandler;
import br.com.payment.management.webapp.contributor.event.ContributorEventHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

/**
 * Class responsible for configuring the behavior for all RestRepositories.
 *
 * @author William Custodio
 */
@Configuration
public class RepositoryRestConfig extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(final RepositoryRestConfiguration config) {
        config.exposeIdsFor(Bead.class);
        config.exposeIdsFor(Campaign.class);
        config.exposeIdsFor(Church.class);
        config.exposeIdsFor(Contribution.class);
        config.exposeIdsFor(Contributor.class);
        config.exposeIdsFor(ProvingType.class);
    }

    /**
     * Create a bean of an event handler responsible for handling operation associated to a {@link br.com.payment.management.core.bead.repository.BeadRepository}
     * @return The event handler.
     */
    @Bean
    public BeadEventHandler beadEventHandler() {
        return new BeadEventHandler();
    }

    /**
     * Create a bean of an event handler responsible for handling operation associated to a {@link br.com.payment.management.core.campaign.repository.CampaignRepository}
     * @return The event handler.
     */
    @Bean
    public CampaignEventHandler campaignEventHandler() {
        return new CampaignEventHandler();
    }

    /**
     * Create a bean of an event handler responsible for handling operation associated to a {@link br.com.payment.management.core.contributor.repository.ContributorRepository}
     * @return The event handler.
     */
    @Bean
    public ContributorEventHandler contributorEventHandler() {
        return new ContributorEventHandler();
    }
}