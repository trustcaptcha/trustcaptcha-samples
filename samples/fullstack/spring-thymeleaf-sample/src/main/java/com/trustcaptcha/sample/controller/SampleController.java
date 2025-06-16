package com.trustcaptcha.sample.controller;

import com.trustcaptcha.library.CaptchaManager;
import com.trustcaptcha.library.exception.CaptchaFailureException;
import com.trustcaptcha.library.model.VerificationResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class SampleController {

    private final Logger logger = LoggerFactory.getLogger(SampleController.class);

    @GetMapping("/")
    public String getPage(Model model) {

        model.addAttribute("model", new PageModel());

        return "index";
    }

    @PostMapping(value = "/")
    public String postPage(@ModelAttribute PageModel pageModel, @RequestParam("tc-verification-token") String verificationToken, Model model) {

        // Retrieving the verification result
        VerificationResult verificationResult;
        try {
            verificationResult = CaptchaManager.getVerificationResult("<your_secret_key>", verificationToken);
        } catch (CaptchaFailureException e) {
            // Fetch verification result failed - handle error
            throw new RuntimeException(e);
        }

        // Do something with the verification result
        if (!verificationResult.isVerificationPassed() || verificationResult.getScore() > 0.5) {
            logger.warn("Verification failed or bot score > 0.5 – possible automated request.");
        }

        model.addAttribute("model", new PageModel());
        model.addAttribute("message", pageModel.getMessage());
        model.addAttribute("verificationResult", verificationResult);

        return "index";
    }
}
