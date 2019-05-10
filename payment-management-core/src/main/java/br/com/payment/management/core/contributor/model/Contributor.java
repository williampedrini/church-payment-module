package br.com.payment.management.core.contributor.model;

import br.com.payment.management.core.bead.model.Bead;
import br.com.payment.management.core.church.model.Church;
import br.com.payment.management.core.contribution.model.Contribution;
import br.com.payment.management.core.contributor.enumerable.CivilStateType;
import br.com.payment.management.core.contributor.enumerable.GenderType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

/**
 * Entity which represents the table with the definition of a person who will make contributions for a certain {@link Church}.
 *
 * @author William Custodio
 */
@Data
@Entity
@Table(name = "CONTRIBUTOR",
        uniqueConstraints = @UniqueConstraint(name = "UK_CONTRIBUTOR_F_NUMBER", columnNames = {"FISCAL_NUMBER"})
)
public class Contributor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotEmpty(message = "application.contributor.messages.name.empty")
    @Column(name = "NAME")
    private String name;

    @Column(name = "FISCAL_NUMBER")
    private Long fiscalNumber;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "application.contributor.messages.gender.empty")
    @Column(name = "GENDER")
    private GenderType gender;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "application.contributor.messages.civilState.empty")
    @Column(name = "CIVIL_STATE")
    private CivilStateType civilState;

    @NotEmpty(message = "application.contributor.messages.address.empty")
    @Column(name = "ADDRESS")
    private String address;

    @NotNull(message = "application.contributor.messages.creationDate.empty")
    @Column(name = "CREATION_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate creationDate;

    @Column(name = "BIRTH_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @Column(name = "MARRIAGE_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate marriageDate;

    @Column(name = "PARTNER_NAME")
    private String partnerName;

    @Column(name = "TELEPHONE")
    private Long telephone;

    @Column(name = "CELLPHONE")
    private Long cellphone;

    @OneToMany
    @JsonIgnore
    @JoinColumn(name="ID_CONTRIBUTOR", referencedColumnName = "ID")
    private List<Contribution> contributions;

    @OneToMany
    @JsonIgnore
    @JoinColumn(name="ID_CONTRIBUTOR", referencedColumnName = "ID")
    private List<Bead> beads;
}