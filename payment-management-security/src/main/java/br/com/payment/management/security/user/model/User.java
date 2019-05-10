package br.com.payment.management.security.user.model;

import br.com.payment.management.security.role.model.Role;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * The representation of a user responsible for executing actions over an application.
 *
 * @author William Custodio
 */
@Entity
@Table(name = "USER",
		uniqueConstraints = @UniqueConstraint(name = "UK_USER_USERNAME", columnNames = "USERNAME")
)
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Size(min = 6, max = 10, message = "application.user.messages.username.size")
	@NotEmpty(message="application.user.messages.username.empty")
	@Column(name = "USERNAME")
	private String username;

	@NotEmpty(message="application.user.messages.password.empty")
	@Column(name = "PASSWORD")
	private String password;

	@NotEmpty(message="application.user.messages.name.empty")
	@Column(name = "NAME")
	private String name;

	@NotEmpty(message="application.user.messages.lastName.empty")
	@Column(name = "LAST_NAME")
	private String lastName;

	@Column(name = "ACTIVE")
	private int active;

	@NotEmpty(message="application.user.messages.role.empty")
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "USER_ROLE",
			joinColumns = @JoinColumn(name = "ID_USER"),
			inverseJoinColumns = @JoinColumn(name = "ID_ROLE")
	)
	private List<Role> roles;

	public Long getId() {
		return id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(final String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(final String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(final String lastName) {
		this.lastName = lastName;
	}

	public int getActive() {
		return active;
	}

	public void setActive(final int active) {
		this.active = active;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(final List<Role> roles) {
		this.roles = roles;
	}
}
