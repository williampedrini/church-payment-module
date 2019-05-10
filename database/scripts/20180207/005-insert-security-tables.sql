/* insert into role table */
insert into `role` (role) values ('admin');

/* insert into user table
   login: saojoaquim and password: saojoaquim */
insert into `user` (`username`,`password`,`name`,`last_name`,`active`) values ('saojoaquim','$2a$10$dhRI0IRUpGMijNNMB8/x1eOBizpt6SO2JveLLuf/NOxEsqVpyhkJa','são joaquim','',1);

/* insert into user_role */
insert into `user_role` (`id_user`,`id_role`) values ((select id from user where username = 'saojoaquim'),(select id from role where role = 'admin'));
commit;