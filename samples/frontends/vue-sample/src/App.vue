<script>

import ApiService from "./apiService";


export default {
  data() {
    return {
      verificationResult: null,
      form: {
        message: '',
        verificationToken: null
      }
    };
  },
  methods: {
    solved(verificationToken) {
      console.log(`Verification-token: ${verificationToken}`);
      this.form.verificationToken = verificationToken;
    },
    failed(error) {
      console.error(error.message);
    },
    handleSubmit() {
      ApiService.postApi(this.form.verificationToken).then(verificationResult => this.verificationResult = verificationResult);
    },
    resetCaptcha() {
      this.$refs.trustcaptchaRef.reset(); // Aufruf der reset() Methode über die Referenz
      this.form.message = ''; // Zurücksetzen der Nachricht
      this.verificationResult = null; // Zurücksetzen des Verifizierungsergebnisses
    }
  }
};

</script>

<template>
  <div class="flex py-24 justify-center h-screen">
    <div class="w-full max-w-lg space-y-4">

      <img alt="Vue logo" src="./assets/logo.svg" width="400" />
      <h1 class="text-3xl font-bold">Vue Sample</h1>
      Try Trustcaptcha.

      <br />

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label for="message" class="block text-sm font-medium leading-6 text-gray-900">Message</label>
          <div class="mt-1">
            <textarea rows="4" name="message" id="message" placeholder="Write a message ..." v-model="form.message" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"></textarea>
          </div>
        </div>

        <trustcaptcha-component
            ref="trustcaptchaRef"
            sitekey="cc2e2d5e-d1ef-4a7f-a7bd-dec5b37df47a"
            language="en"
            theme="light"
            autostart="active"
            @captchaSolved="solved($event.detail)"
            @captchaFailed="failed($event.detail)"
        ></trustcaptcha-component>

        <button type="submit" class="w-full rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:opacity-60 disabled:hover:bg-green-500" :disabled="!form.verificationToken || verificationResult">Send message</button>
      </form>

      <div v-if="verificationResult" class="space-y-4">
        <div class="rounded-md bg-green-50 p-4 border border-green-500">
          <strong>Message: </strong>{{ form.message }}<br>
          <strong>Passed: </strong>{{ verificationResult.verificationPassed }}<br>
          <strong>Reason: </strong>{{ verificationResult.reason }}<br>
          <strong>Score: </strong>{{ verificationResult.score }}<br>
        </div>
        <button type="button" class="w-full rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500" @click="resetCaptcha">Reset captcha</button>
      </div>

    </div>
  </div>
</template>
