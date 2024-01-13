package com.trustcaptcha.sample;

import com.trustcaptcha.library.CaptchaManager;
import com.trustcaptcha.library.exception.CaptchaFailureException;
import com.trustcaptcha.library.model.VerificationResult;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(originPatterns = ["http://localhost:[*]", "http://127.0.0.1:[*]"])
class ApiController {

    private val logger = LoggerFactory.getLogger(ApiController::class.java)

    @PostMapping("/api/example")
    fun postApiExample(@RequestBody verificationRequest: VerificationRequest): ResponseEntity<VerificationResult> {

        // Retrieving the verification result
        val verificationResult = try {
            CaptchaManager.getVerificationResult("<your_secret_key>", verificationRequest.verificationToken)
        } catch (e: CaptchaFailureException) {
            // Fetch verification result failed - handle error
            throw RuntimeException(e)
        }

        // Do something with the verification result
        if (!verificationResult.isVerificationPassed || verificationResult.score > 0.5) {
            logger.warn("Verification failed, or bot score is higher than 0.5 – this could indicate a bot.")
        }

        return ResponseEntity.ok(verificationResult)
    }
}
