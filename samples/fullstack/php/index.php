<?php

require_once __DIR__ . '/vendor/autoload.php';

use Trustcaptcha\CaptchaManager;

$message = "";
$verificationResult = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $message = $_POST['message'] ?? '';
    $verificationToken = $_POST['myToken'] ?? '';

    // Retrieving the verification result
    try {
        $verificationResult = CaptchaManager::getVerificationResult("<your_secret_key>", $verificationToken);
    } catch (Exception $e) {
        // Fetch verification result failed - handle error
        throw new RuntimeException($e);
    }

    // Do something with the verification result
    if (!$verificationResult->verificationPassed || $verificationResult->score > 0.5) {
        $message = "Verification failed, or bot score is higher than 0.5 – this could indicate a bot.";
    }
}

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Trustcaptcha Testsystem</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <script type="module" src="https://resources.trustcaptcha.com/1_7_x/trustcaptcha.js"></script>
    </head>
    <body class="py-5">
        <div class="d-flex justify-content-center">
            <div class="w-100" style="max-width: 640px;">
                <h1>PHP</h1>
                Try PHP<br />
                <form action="/" method="post">
                    <div class="mb-3">
                        <label for="messageInput" class="form-label">Message</label>
                        <textarea class="form-control" id="messageInput" name="message" placeholder="Write a message" rows="3"><?= htmlspecialchars($message) ?></textarea>
                    </div>
                    <div class="mb-3">
                        <trustcaptcha-component
                            id="trustcaptchaComponent"
                            sitekey="<your_site_key>"
                            language="en"
                            theme="light"
                            token-field-name="myToken"
                        ></trustcaptcha-component>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-success" id="submitButton" disabled>Post new message</button>
                    </div>
                </form>
                <?php if ($verificationResult): ?>
                    <div class="alert alert-success mt-3" role="alert">
                        <strong>Message: </strong><?= htmlspecialchars($message) ?><br>
                        <strong>Passed: </strong><?= $verificationResult->verificationPassed ? 'true' : 'false' ?><br>
                        <strong>Reason: </strong><?= htmlspecialchars($verificationResult->reason) ?><br>
                        <strong>Score: </strong><?= htmlspecialchars($verificationResult->score) ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </body>

    <script>

      <!-- example, unused in this sample -->
      function resetCaptcha() {
        const trustcaptchaComponent = document.getElementById('trustcaptchaComponent');
        trustcaptchaComponent.reset();
      }

      const trustcaptchaComponent = document.getElementById('trustcaptchaComponent');
      trustcaptchaComponent.addEventListener('captchaSolved', (event) => {
        console.log('Verification token:', event.detail);
        const submitButton = document.getElementById('submitButton');
        submitButton.disabled = false;
      });
      trustcaptchaComponent.addEventListener('captchaFailed', (event) => {
        console.error(event.detail);
      });
    </script>

</html>
