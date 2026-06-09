DISPLAY_NAME=EventHub Backend
DESCRIPTION=API do Sistema de Locacao EventHub
MAIN=target/toyloop-0.0.1-SNAPSHOT.jar
BUILD_COMMAND=mvn clean package -DskipTests
START_COMMAND=java -jar target/toyloop-0.0.1-SNAPSHOT.jar
MEMORY=1536
VERSION=recommended