import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  passwordVisible = false;
  passwordConfirmVisible = false;
  isLoginForm = true;
  isLoading = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({

      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  get f() {
    return this.form.controls;
  }

  change() {
    this.isLoginForm = !this.isLoginForm;
    this.reset();
  }

  reset() {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].setErrors(null);
        this.form.controls[i].markAsPristine();
      }
    }
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
  }


  register(email: string, password: string) {
    this.isLoading = true;
    var user = {
      email: email,
      password: password
    };
    this.authService.register(user).subscribe(result => {
      if (result == 'SUCCESS') {
        this.notification.success('Success', 'Register Success');
        window.location.href = '/';
      } else {
        this.notification.error('Error', 'Register Fail');
      }
    }, (message) => {
      this.isLoading = false;
      if (this.form.controls.confirmPassword.value != this.form.controls.password.value)
        this.notification.error('Error', "Password and Confirm Password must be the same. Please try again.");
      else if (message.message.includes('existed'))
        this.notification.error('Error', "This email is unavailable. Please chose another one.");
      else if (message.message.includes('invalid email'))
        this.notification.error('Error', "Invalid email. Please try again.");
      else if (message.message.includes('invalid password'))
        this.notification.error('Error', "Password must contain at least 8 charaters. Please try again.");
      else this.notification.error('Error', message.message);
    });
  }

  login(email: string, password: string) {
    this.isLoading = true;
    var user = {
      email: email,
      password: password
    }
    this.authService.login(user).subscribe(result => {
      if (result == 'SUCCESS') {
        const returnUrl: string = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
        window.location.href = returnUrl;
      } else if (result == 'ERROR_NAME_OR_PASS') {
        alert('Error');
      }
    }, (message) => {
      this.isLoading = false;
      this.notification.error('Error', 'Invalid email/password combination. Please try again.');
    });
  }
  fwp(){
    window.location.href = 'forgot-password';
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

}
