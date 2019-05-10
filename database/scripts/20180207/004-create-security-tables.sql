set foreign_key_checks = 0;
drop table if exists `role`;
drop table if exists `user`;
drop table if exists `user_role`;
set foreign_key_checks = 1;

/* role table */
create table `role` (
  `id` int(11) not null auto_increment,
  `role` varchar(255) default null,
  primary key (`id`)
);

/* user table */
create table `user` (
  `id` int(11) not null auto_increment,
  `username` varchar(255) not null,
  `password` varchar(255) not null,
  `name` varchar(255) not null,
  `last_name` varchar(255) not null,
  `active` int(11) default null,
  primary key (`id`)
);

/* user_role table */
create table `user_role` (
  `id_user` int(11) not null,
  `id_role` int(11) not null,
  primary key (`id_user`,`id_role`),
  constraint fk_user_role foreign key (id_user) references `user`(id),
  constraint fk_role_user foreign key (id_role) references `role`(id),
  constraint uk_user_role unique (id_user, id_role)
);