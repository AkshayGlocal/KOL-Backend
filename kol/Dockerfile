FROM amazoncorretto:11
COPY target/Kol-jar.jar Kol-jar.jar
EXPOSE 8081
ENTRYPOINT ["java","-Dspring.profiles.active=dev","-jar","Kol-jar.jar"]