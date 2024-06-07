using Microsoft.AspNetCore.Mvc;
using csharp_sample.Models;
using TrustcaptchaCSharp.Lib;
using TrustcaptchaCSharp.Lib.Model;

namespace csharp_sample.Controllers;

[ApiController]
[Route("api/example")]
public class CaptchaController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> PostApiExample([FromBody] VerificationRequest verificationRequest)
    {
        // Retrieving the verification result
        VerificationResult verificationResult;
        try
        {
            verificationResult = await CaptchaManager.GetVerificationResult("<your_secret_key>", verificationRequest.VerificationToken);
        }
        catch (Exception ex)
        {
            // Fetch verification result failed - handle error
            Console.WriteLine($"Error: {ex.Message}");
            return StatusCode(500, new { error = "Captcha verification failed", details = ex.Message });
        }

        // Do something with the verification result
        if (!verificationResult.VerificationPassed || verificationResult.Score > 0.5)
        {
            Console.WriteLine("Verification failed, or bot score is higher than 0.5 – this could indicate a bot.");
        }

        return Ok(verificationResult);
    }
}