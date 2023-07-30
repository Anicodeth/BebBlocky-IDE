import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BridgeService } from '../shared/services/bridge.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public mobileToggle: boolean = true;
  public error: string = "";
  public success: string = "";

  constructor(private service: BridgeService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)],],
      password: ['', [Validators.required, Validators.minLength(5)]],
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

    if (this.loginForm.invalid) {
      this.isButtonDisabled = false;
      // set error to be a valid error message
      if (this.loginForm.get("username")?.invalid) {
        this.error = "Usernames must be at least be 3 characters long.";
      } else if (this.loginForm.get("password")?.invalid) {
        this.error = "Passwords must be at least be 6 characters long.";
      }
      return;
    }

    this.error = "";
    this.service.signIn(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (response: any) => {
          // Success callback
          this.isButtonDisabled = false;

          const user = response.user;

          if (user.role === "user") {
            this.router.navigateByUrl("/dashboard/courses");
          } else {
            this.router.navigateByUrl("/admin/courses");
          }

        },
        (error: any) => {
          this.error = error;
          this.isButtonDisabled = false;
        }
      );

  }

  //function to handle the signup functionality
  signup() {
    this.isButtonDisabled = true;

    if (this.signupForm.invalid) {
      this.isButtonDisabled = false;
      // set error to be a valid error message
      if (this.signupForm.get("name")?.invalid) {
        this.error = "Name must be at least be 3 characters long.";
      } else if (this.signupForm.get("email")?.invalid) {
        this.error = "Enter a valid email. We suggest you put your primary email.";
      } else if (this.signupForm.get("password")?.invalid) {
        this.error = "Passwords must be at least be 6 characters long.";
      }
      return;
    }

    this.error = "";
    this.service
      .signUp(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password)

      .subscribe((res) => {
        this.isButtonDisabled = false;
        this.success = "Account created successfully. Please login to continue.";
        // set some timeout to redirect to login page
        setTimeout(() => {
          this.success = "";
          this.cheaker();
        }, 1000);
      }, (err) => {
        this.isButtonDisabled = false;
        this.error = err;
      }
      );
  }
}
