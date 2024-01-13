import { Component } from '@angular/core';
import {ApiService, VerificationResultDto} from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public message: string = '';
  public verificationToken!: string;
  public verificationResult!: VerificationResultDto;

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
}
