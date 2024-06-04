package com.trustcaptcha.sample

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty

case class VerificationRequest @JsonCreator() (@JsonProperty("verificationToken") verificationToken: String)
