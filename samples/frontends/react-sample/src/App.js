import logo from './logo.svg';
import './App.css';
import {TrustcaptchaComponent, defineCustomElements} from "@trustcaptcha/trustcaptcha-react";
import {useRef, useState} from "react";
import apiService from './apiService';

defineCustomElements()


function App() {

    const trustcaptchaRef = useRef(null);
    const [verificationResult, setVerificationResult] = useState(null);
    const [form, setForm] = useState({ message: '', verificationToken: null });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    function solved(verificationToken) {
        console.log(`Verification-token: ${verificationToken}`);
        setForm(prevForm => ({ ...prevForm, verificationToken: verificationToken }));
    }

    function failed(error) {
        console.error(error);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        apiService.postApi(form.verificationToken).then(verificationResult => setVerificationResult(verificationResult));
    };

    const resetCaptcha = () => {
        trustcaptchaRef.current.reset();
        setForm({ message: '', verificationToken: null });
        setVerificationResult(null);
    };


    return (
        <div>
            <div className="flex py-24 justify-center h-screen">
                <div className="w-full max-w-lg space-y-4">

                    <img src={logo} height={400} alt="logo"/>
                    <h1 className="text-3xl font-bold">React Sample</h1>
                    Try Trustcaptcha.

                    <br/>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Message</label>
                            <div className="mt-1">
                                <textarea rows="4" name="message" id="message" placeholder="Write a message ..." value={form.message} onChange={handleInput}
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>

                        <TrustcaptchaComponent
                            ref={trustcaptchaRef}
                            sitekey="<your_site_key>"
                            language="en"
                            theme="light"
                            onCaptchaSolved={event => solved(event.detail)}
                            onCaptchaFailed={event => failed(event.detail)}
                        ></TrustcaptchaComponent>

                        <button type="submit"
                                className="w-full rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:opacity-60 disabled:hover:bg-green-500"
                                disabled={!form.verificationToken || verificationResult}>Send message
                        </button>
                    </form>

                    {verificationResult &&
                        <div className="space-y-4">
                            <div className="rounded-md bg-green-50 p-4 border border-green-500">
                                <strong>Message: </strong>{form.message}<br/>
                                <strong>Passed: </strong>{verificationResult.verificationPassed.toString()}<br/>
                                <strong>Reason: </strong>{verificationResult.reason}<br/>
                                <strong>Score: </strong>{verificationResult.score}<br/>
                            </div>
                            <button type="button" className="w-full rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500" onClick={() => resetCaptcha()}>Reset captcha</button>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default App;