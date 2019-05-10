/* insert initial data for church. */
insert into `church` (`name`) values ('PARÓQUIA SÃO JOAQUIM');

/* insert initial data for proving type */
insert into `proving_type` (`name`, `mnemonic`) values ('TALÃO', 'TLO');
insert into `proving_type` (`name`, `mnemonic`) values ('SEM COMPROVANTE', 'SCT');

/* insert initial data for role. */
insert into `role` (role) values ('ADMIN');

/* insert initial data for user. */
insert into `user` (`username`,`password`,`name`,`last_name`,`active`) values ('saojoaquim','$2a$10$dhRI0IRUpGMijNNMB8/x1eOBizpt6SO2JveLLuf/NOxEsqVpyhkJa','SÃO JOAQUIM','',1);

/* insert initial data for user role. */
insert into `user_role` (`id_user`,`id_role`) values ((select id from user where username = 'saojoaquim'),(select id from role where role = 'ADMIN'));

-- insert into campaign table
insert into campaign (name, creation_date, initial_date, final_date, id_church, id_proving_type) values ('Rifa', '2018-01-14', '2018-01-14', null, (select id from church where name = 'PARÓQUIA SÃO JOAQUIM'), (select id from proving_type where mnemonic = 'TLO'));
insert into campaign (name, creation_date, initial_date, final_date, id_church, id_proving_type) values ('Dizimo', '2018-01-14', '2018-01-14', null, (select id from church where name = 'PARÓQUIA SÃO JOAQUIM'), (select id from proving_type where mnemonic = 'SCT'));

-- insert into contributor table
insert into contributor (name, fiscal_number, gender, civil_state, address, birth_date, marriage_date, partner_name, telephone, cellphone) values ('William Custodio', 99999999999, 'MALE', 'MARRIED','Travessa da Giesta, 4, Lisboa', '1989-03-23', '2016-05-01', 'Carolina Tavares Gaspar', 99999999, 99999999);

-- insert into bead table
insert into bead (identification_number, id_contributor, id_campaign) values ('A21', (select id from contributor where fiscal_number = 99999999999), (select id from campaign where name = 'Rifa'));