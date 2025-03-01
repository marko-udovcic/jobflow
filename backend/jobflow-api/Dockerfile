# 1. Build stage
FROM openjdk:17-jdk-slim AS build
WORKDIR /app


COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .


RUN chmod +x mvnw && ./mvnw dependency:go-offline


FROM openjdk:17-jdk-slim
WORKDIR /app


COPY . .


EXPOSE 8080


ENTRYPOINT ["./mvnw", "spring-boot:run", "-Dspring-boot.run.jvmArguments=-Dspring.devtools.restart.enabled=true"]
