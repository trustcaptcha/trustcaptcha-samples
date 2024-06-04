package com.trustcaptcha.sample

import com.trustcaptcha.library.CaptchaManager
import com.trustcaptcha.library.exception.CaptchaFailureException
import com.trustcaptcha.library.model.VerificationResult
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(originPatterns = ["http://localhost:[*]", "http://127.0.0.1:[*]"])
class ApiController {

    private static final Logger logger = LoggerFactory.getLogger(ApiController)

    @PostMapping("/api/example")
    ResponseEntity<VerificationResult> postApiExample(@RequestBody VerificationRequest verificationRequest) {

        // Retrieving the verification result
        VerificationResult verificationResult
        try {
            verificationResult = CaptchaManager.getVerificationResult("<your_secret_key>", verificationRequest.verificationToken)
        } catch (CaptchaFailureException e) {
            // Fetch verification result failed - handle error
            throw new RuntimeException(e)
        }

        // Do something with the verification result
        if (!verificationResult.isVerificationPassed() || verificationResult.getScore() > 0.5) {
            logger.warn("Verification failed, or bot score is higher than 0.5 – this could indicate a bot.")
        }

        return ResponseEntity.ok(verificationResult)
    }
}
