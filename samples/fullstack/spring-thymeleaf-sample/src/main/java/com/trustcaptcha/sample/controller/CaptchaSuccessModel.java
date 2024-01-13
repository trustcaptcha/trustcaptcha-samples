package com.trustcaptcha.sample.controller;

import com.trustcaptcha.library.model.VerificationResult;

public class CaptchaSuccessModel {

    private final String message;
    private final VerificationResult verificationResult;

    public CaptchaSuccessModel(String message, VerificationResult verificationResult) {
        this.message = message;
        this.verificationResult = verificationResult;
    }

    public String getMessage() {
        return message;
    }

    public VerificationResult getVerificationResult() {
        return verificationResult;
    }
}
