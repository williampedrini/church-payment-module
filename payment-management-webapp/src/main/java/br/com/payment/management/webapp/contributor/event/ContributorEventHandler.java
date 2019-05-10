package br.com.payment.management.webapp.contributor.event;

import br.com.payment.management.core.contributor.model.Contributor;
import br.com.payment.management.core.contributor.service.ContributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

/**
 * Event handler responsible for handling operation associated to a {@link br.com.payment.management.core.contributor.repository.ContributorRepository}
 *
 * @author williamcustodio
 */
@RepositoryEventHandler(value = Contributor.class)
public class ContributorEventHandler {

    @Autowired
    private ContributorService contributorService;

    /**
     * Execute processes before the deletion of a contributor.
     * @param contributor The contributor to be deleted.
     */
    @HandleBeforeDelete
    public void handleBeforeDelete(final Contributor contributor) {
        this.contributorService.deleteAssociations(contributor);
    }
}