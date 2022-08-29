FROM amazoncorretto:11-alpine-jdk
COPY target/Kol-jar.jar Kol-jar.jar
EXPOSE 8081
ENTRYPOINT ["java","Main-Class:kol.src.main.java.com.kol.kol.KolApplication","-Dspring.profiles.active=dev","-jar","Kol-jar.jar"]