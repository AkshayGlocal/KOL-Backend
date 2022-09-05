FROM amazoncorretto:11-alpine-jdk
COPY target/Kol-jar.jar Kol-jar.jar
EXPOSE 8081
ENTRYPOINT ["java","-Dspring.profiles.active=dev","-jar","Kol-jar.jar"]