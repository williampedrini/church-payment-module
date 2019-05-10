set foreign_key_checks = 0;
drop table if exists church;
drop table if exists campaign;
drop table if exists contributor;
drop table if exists proving_type;
drop table if exists contribution;
drop table if exists bead;
drop table if exists bead_contribution;
set foreign_key_checks = 1;

/* church table */
create table `church` (
  id bigint not null auto_increment comment 'sequential identifier of a church.',
  name varchar(255) not null comment 'name used as the identification of a church.',
  primary key (id))
comment = 'table with all existing churchs.';

/* proving_type table */
create table `proving_type` (
  id bigint not null auto_increment comment 'sequential identifier of a proving type.',
  name varchar(255) not null comment 'name used as the identification of a proving of payment .',
  mnemonic char(3) not null comment 'mnemonic used as the identification of a proving of payment.',
  primary key (id),
  constraint uk_proving_type_mnemonic unique (mnemonic))
comment = 'table with all existing proving types.';

/* campaign table */
create table `campaign` (
  id bigint not null auto_increment comment 'sequential identifier of a campaign.',
  id_church bigint null comment 'sequential identifier of a church.',
  id_proving_type bigint null comment 'sequential identifier of a proving type.',
  name varchar(255) not null comment 'sequential identifier of a campaign.',
  creation_date date not null,
  initial_date date null,
  final_date date null,
  primary key (id),
  constraint fk_campaign_church foreign key (id_church) references church(id),
  constraint fk_contribution_prov_type foreign key (id_proving_type) references proving_type(id),
  constraint uk_campaign_name unique (name))
comment = 'table with all existing proving types campaigns.';

/* contributor table */
create table `contributor` (
  id bigint not null auto_increment comment 'sequential identifier of a contributor.',
  name varchar(255) not null comment 'name used as the identification of a contributor.',
  fiscal_number bigint null comment 'the fiscal number of the contributor.',
  gender char(6) not null comment 'the gender of the contributor, where m - male and f - female.',
  civil_state varchar(12) not null comment 'the civil state of the contributor. the possible values are: single, married, stable union, divorced and widower.',
  address varchar(255) not null comment 'the address where the contributor lives.',
  birth_date date null comment 'the birthday of the contributor.',
  marriage_date date null comment 'the day that the contributor got engaged.',
  creation_date date not null comment 'the dat that the contributor was registered',
  partner_name varchar(255) null comment 'the name of the partner who is marriage with the contributor.',
  telephone bigint null,
  cellphone bigint null,
  primary key (id),
  constraint uk_contributor_f_number unique (fiscal_number))
comment = 'table with all existing contributors.';

/* contribution table */
create table `contribution` (
  id bigint not null auto_increment comment 'sequential identifier of a contribution.',
  id_campaign bigint null comment 'sequential identifier of a campaign.',
  id_contributor bigint null comment 'sequential identifier of a contributor.',
  creation_date date not null comment 'the date that the contribution was register.',
  amount bigint not null comment 'the amount of the contribution in cents.',
  observation varchar(255) null comment 'the field to insert some observation.',
  primary key (id),
  constraint fk_campaign_contribution foreign key (id_campaign) references campaign(id),
  constraint fk_contributor_contribution foreign key (id_contributor) references contributor(id))
comment = 'table with all existing contributions.';

/* bead_contribution table */
create table `bead` (
  id bigint not null auto_increment comment 'sequential identifier of a bead.',
  id_campaign bigint null comment 'sequential identifier of a contribution.',
  id_contributor bigint null comment 'sequential identifier of a contributor.',
  identification_number varchar(10) null comment 'the identification number located on the physical bead.',
  primary key (id),
  constraint fk_bead_campaign foreign key (id_campaign) references campaign(id),
  constraint fk_bead_contributor foreign key (id_contributor) references contributor(id),
  constraint uk_contributor_camp_bead unique (id_campaign, id_contributor))
comment = 'table with all existing beads.';

/* bead_contribution table */
create table `bead_contribution` (
  id_bead bigint null comment 'sequential identifier of a relationship between a bead and its contributions.',
  id_contribution bigint null comment 'sequential identifier of a contribution.',
  constraint fk_bead_contribution foreign key (id_bead) references bead(id),
  constraint fk_contribution_bead foreign key (id_contribution) references contribution(id),
  constraint uk_bead_contribution unique (id_bead, id_contribution))
comment = 'table with all existing contributions associated to all beads.';
