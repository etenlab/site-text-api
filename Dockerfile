FROM amazoncorretto:18
EXPOSE 8103
ARG JAR_FILE=target/*.jar
COPY build/libs/database-api-0.0.1-SNAPSHOT.jar app.jar
COPY build/resources/main/application.yml application.yml
ENTRYPOINT ["java","-jar","/app.jar"]