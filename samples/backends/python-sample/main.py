from flask import Flask, request, jsonify
from flask_cors import cross_origin
from trustcaptcha.captcha_manager import CaptchaManager

app = Flask(__name__)


@app.route('/api/example', methods=['POST'])
@cross_origin(origins=["http://localhost:*", "http://127.0.0.1:*"])
def post_api_example():

    verification_token = request.get_json()['verificationToken']

    # Retrieving the verification result
    try:
        verification_result = CaptchaManager.get_verification_result("<your_secret_key>", verification_token)
    except Exception as e:  # Hier könnten Sie eine spezifischere Ausnahme einfügen
        # Log the exception or handle it
        print(f"Failed to fetch verification result: {e}")
        return jsonify({'error': 'Captcha verification failed'}), 500

    # Do something with the verification result
    if verification_result.verificationPassed is not True or verification_result.score > 0.5:
        print("Verification failed, or bot score is higher than 0.5 – this could indicate a bot.")

    return verification_result.to_json()


if __name__ == '__main__':
    app.run(debug=True, port=8080)
