import {Component, ViewChild} from '@angular/core';
import {ApiService, VerificationResultDto} from "./api.service";
import {TrustcaptchaComponent} from "@trustcaptcha/trustcaptcha-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('trustcaptchaComponent')
  public trustcaptchaComponent!: TrustcaptchaComponent

  public message: string = '';
  public verificationToken!: string;
  public verificationResult!: VerificationResultDto | null;

  constructor(
    private apiService: ApiService,
  ) { }

  solved(verificationToken: string): void {
    console.log(`Verification-token: ${verificationToken}`)
    this.verificationToken = verificationToken
  }

  failed(error: any): void {
    console.error(error.message)
  }

  handleSubmit() {
    this.apiService.postApi(this.verificationToken).subscribe(verificationResult => this.verificationResult = verificationResult);
  }

  resetCaptcha(): void {
    this.trustcaptchaComponent.reset()
    this.message = ''
    this.verificationResult = null
  }
}
