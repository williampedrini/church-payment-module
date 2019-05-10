package br.com.payment.management.core.provingType.enumerable;

/**
 * The possible values for a {@link br.com.payment.management.core.provingType.model.ProvingType}
 *
 * @author williamcustodio.
 */
public enum ProvingTypeCatalog {

    /**
     * When a proving type represents a {@link br.com.payment.management.core.bead.model.Bead}
     */
    TLO,

    /**
     * When a proving type is not necessary.
     */
    SCT;
}
