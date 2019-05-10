FROM openjdk:8-jdk-alpine
MAINTAINER William Custodio
VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} payment-management-application.jar
ENTRYPOINT java -Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=docker -jar payment-management-application.jar