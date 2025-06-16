import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import {CaptchaManager} from "@trustcaptcha/trustcaptcha-nodejs";

const app = express();
app.use(cors({ origin: '*' }));
app.use(json());

app.post('/api/example', async (req, res) => {

    const verificationToken = req.body.verificationToken;

    // Retrieving the verification result
    let verificationResult;
    try {
        verificationResult = await CaptchaManager.getVerificationResult("<your_secret_key>", verificationToken);
    } catch (error) {
        // Fetch verification result failed - handle error
        console.error(error)
        res.status(500).send('Internal Server Error');
        return
    }

    // Do something with the verification result
    if (!verificationResult.verificationPassed || verificationResult.score > 0.5) {
        console.log("Verification failed or bot score > 0.5 – possible automated request.");
    }

    res.json(verificationResult);
});

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
