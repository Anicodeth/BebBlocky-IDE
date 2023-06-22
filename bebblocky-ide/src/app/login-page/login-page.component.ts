import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BridgeService } from '../bridge.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public mobileToggle: boolean = true;


  constructor(private service: BridgeService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  isButtonDisabled: boolean = false;
  isClassActive: boolean = false;

  cheaker() {
    this.isClassActive = !this.isClassActive;
  }

  toggle() {
    this.mobileToggle = !this.mobileToggle;
  }

  //function to handle the login functionality
  login(): void {
  this.isButtonDisabled = true;

  this.service.signIn(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe(
      (response: any) => {
        console.log('ng here');
        this.isButtonDisabled = false;
        this.service.userData = response.user;
        sessionStorage.setItem('auth_token', response.token);
        sessionStorage.setItem("courseProg", JSON.stringify(response.user.progress));

        this.router.navigateByUrl("/profile");
      },
      (error: any) => {
        alert(error.message);
        this.isButtonDisabled = false;
      }
    );
}

  //function to handle the signup functionality
  signup() {
    this.isButtonDisabled = true;
    this.service
      .signUp(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password)

      .subscribe((res) => {
        this.isButtonDisabled = true;
        this.cheaker();

      }, (err) => {
        this.isButtonDisabled = true;
        alert(err.message)
      }
      );
  }
}
