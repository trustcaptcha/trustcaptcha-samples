name := "trustcaptcha-scala-spring-sample"

version := "0.1"

scalaVersion := "2.13.12"

libraryDependencies ++= Seq(
  "org.springframework.boot" % "spring-boot-starter-web" % "3.2.1",
  "com.trustcaptcha" % "trustcaptcha-java" % "1.1.1",
  "org.springframework.boot" % "spring-boot-starter-test" % "3.2.1" % Test
)

mainClass in (Compile, run) := Some("com.trustcaptcha.sample.SampleApplication")
