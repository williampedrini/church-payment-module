package br.com.payment.management.core.contribution.model;

import br.com.payment.management.core.campaign.model.Campaign;
import br.com.payment.management.core.contributor.model.Contributor;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * Entity which represents the table with the definition of a certain contribution associated to a specific {@link Campaign}.
 *
 * @author William Custodio
 */
@Data
@Entity
@Table(name = "CONTRIBUTION")
public class Contribution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotNull(message = "application.contribution.messages.creationDate.empty")
    @Column(name = "CREATION_DATE")
    private LocalDate creationDate;

    @NotNull(message = "application.contribution.messages.amount.empty")
    @Column(name = "AMOUNT")
    private Long amount;

    @NotNull(message = "application.contribution.messages.campaign.empty")
    @ManyToOne
    @JoinColumn(name = "ID_CAMPAIGN")
    private Campaign campaign;

    @NotNull(message = "application.contribution.messages.contributor.empty")
    @ManyToOne
    @JoinColumn(name = "ID_CONTRIBUTOR")
    private Contributor contributor;

    @Column(name = "OBSERVATION")
    private String observation;
}