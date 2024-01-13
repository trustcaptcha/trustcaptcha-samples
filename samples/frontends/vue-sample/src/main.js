import './styles.css'

import { createApp } from 'vue'
import App from './App.vue'
import {TrustcaptchaComponent} from "@trustcaptcha/trustcaptcha-vue";

createApp(App).use(TrustcaptchaComponent).mount('#app')
