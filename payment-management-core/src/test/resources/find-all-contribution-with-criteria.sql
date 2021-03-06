-- INSERT INTO CONTRIBUTOR TABLE
INSERT INTO CONTRIBUTOR (NAME, FISCAL_NUMBER, GENDER, CIVIL_STATE, ADDRESS, BIRTH_DATE, MARRIAGE_DATE, PARTNER_NAME, TELEPHONE, CELLPHONE) VALUES ('Rafael Custodio', 99999999991, 'MALE', 'MARRIED','Travessa da Giesta, 4, Lisboa', '1989-03-23', '2016-05-01', 'Gabriela', 99999999, 99999999);

-- INSERT INTO CAMPAIGN TABLE
INSERT INTO CAMPAIGN (NAME, CREATION_DATE, INITIAL_DATE, FINAL_DATE, ID_CHURCH, ID_PROVING_TYPE) VALUES ('Rifa de Bicicleta', '2018-01-14', '2018-01-14', NULL, (SELECT ID FROM CHURCH WHERE NAME = 'PARÓQUIA SÃO JOAQUIM'), (SELECT ID FROM PROVING_TYPE WHERE MNEMONIC = 'TLO'));

-- INSERT INTO CONTRIBUTION TABLE
INSERT INTO CONTRIBUTION (CREATION_DATE, AMOUNT, ID_CAMPAIGN, ID_CONTRIBUTOR) VALUES ('2018-01-14', 100, (SELECT ID FROM CAMPAIGN WHERE NAME = 'Rifa de Bicicleta'), (SELECT ID FROM CONTRIBUTOR WHERE FISCAL_NUMBER = 99999999999));
INSERT INTO CONTRIBUTION (CREATION_DATE, AMOUNT, ID_CAMPAIGN, ID_CONTRIBUTOR) VALUES ('2018-01-14', 100, (SELECT ID FROM CAMPAIGN WHERE NAME = 'Rifa de Bicicleta'), (SELECT ID FROM CONTRIBUTOR WHERE FISCAL_NUMBER = 99999999991));

-- INSERT INTO BEAD TABLE
INSERT INTO BEAD (IDENTIFICATION_NUMBER, ID_CONTRIBUTOR, ID_CAMPAIGN) VALUES ('A22', (SELECT ID FROM CONTRIBUTOR WHERE FISCAL_NUMBER = 99999999991), (SELECT ID FROM CAMPAIGN WHERE NAME = 'Rifa de Bicicleta'));