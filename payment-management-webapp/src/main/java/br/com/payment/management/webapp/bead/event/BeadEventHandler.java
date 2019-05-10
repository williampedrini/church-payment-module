package br.com.payment.management.webapp.bead.event;

import br.com.payment.management.core.bead.model.Bead;
import br.com.payment.management.core.bead.service.BeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

/**
 * Event handler responsible for handling operation associated to a {@link br.com.payment.management.core.bead.repository.BeadRepository}
 *
 * @author williamcustodio
 */
@RepositoryEventHandler(value = Bead.class)
public class BeadEventHandler {

    @Autowired
    private BeadService beadService;

    /**
     * Execute processes before the deletion of a bead.
     * @param bead The bead to be deleted.
     */
    @HandleBeforeDelete
    public void handleBeforeDelete(final Bead bead) {
        this.beadService.deleteAssociations(bead);
    }
}