# README #

This project is a definition of an application for the management of payments associated to events of a certain church.

### PROJECT REQUIREMENTS ###

* Java 8
* Maven 3.3.9
* Node v9.4.0
* npm 5.6.0

### HOW TO CONFIGURE ###

1. Import the project as maven project using an IDE
2. For the edition of the entity-relationship model use the DB Designer.

### HOW TO RUN AS WEB APPLICATION (IN DEVELOPMENT MODE) ###

1. Execute **mvn install -Pwebapp-dev,angular,angular-dev** inside of **root folder**
2. Execute **mvn -Pwebapp-dev,angular,angular-dev spring-boot:run -Drun.profiles=dev** inside of **payment-management-webapp**
3. Use the following address **http://localhost:8080/** to access the application.

### HOW TO RUN WITH MOCK SERVER ###

1. Access the folder **payment-management-angular/src/main/resources/static**
2. Execute **npm install**
3. Execute **npm run build-dev**
4. Execute **npm run mock-server**
5. Use the following address **http://localhost:8080/** to access the application.
