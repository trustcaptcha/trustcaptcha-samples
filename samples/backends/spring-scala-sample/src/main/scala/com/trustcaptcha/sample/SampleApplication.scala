package com.trustcaptcha.sample

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class SampleApplication

object SampleApplication extends App {
  SpringApplication.run(classOf[SampleApplication], args: _*)
}
