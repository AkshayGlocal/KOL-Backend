# FROM maven:3.8.6-jdk-11 AS build
# WORKDIR /opt/app
# COPY ./ /opt/app
# RUN mvn clean install -DskipTests

# FROM amazoncorretto:11
# COPY --from=build /opt/app/target/*.jar app.jar
# ENV PORT 8081
# EXPOSE $PORT
# ENTRYPOINT ["java","-jar","-Xmx1024M","-Dserver.port=${PORT}","-Dspring.profiles.active=prod","app.jar"]

FROM amazoncorretto:11-alpine-jdk
COPY target/Kol-jar.jar Kol-jar.jar
ENV PORT 8081

EXPOSE $PORT
ENTRYPOINT ["java","-Dspring.profiles.active=prod","-Dserver.port=${PORT}","-jar","Kol-jar.jar"]

