package br.com.payment.management.security.role.model;

import br.com.payment.management.security.user.model.User;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 * The representation of role associated to an {@link User}.
 *
 * @author William Custodio
 */
@Entity
@Table(name = "ROLE",
		uniqueConstraints = @UniqueConstraint(name = "UK_ROLE_MNEMONIC", columnNames = "ROLE")
)
public class Role {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private int id;

	@Size(min = 3, max = 5, message = "application.role.messages.role.size")
	@NotEmpty(message="application.role.messages.role.empty")
	@Column(name="ROLE")
	private String role;
	
	public int getId() {
		return id;
	}

	public void setId(final int id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(final String role) {
		this.role = role;
	}
}