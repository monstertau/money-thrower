import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit{
  form!: FormGroup;
  passwordVisible = false;
  passwordConfirmVisible = false;
  isPassForm = true;
  isLoading = false;
  isValid = true;
  token: string ="";
  email:string ="";

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService) {
      
     }

  ngOnInit(): void {
      this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
    });
      this.activatedRoute.queryParams
      .subscribe(params => {
          this.token = params.token;
          this.email = params.email;
      });
      console.log(this.email);
      console.log(this.token);
      var user = {
        email: this.email,
        token: this.token
    }
      this.authService.checkTokenAndMail(user).subscribe(result => {
        if (result == 'SUCCESS') {
          console.log("success");
        } else if (result == 'FAIL') {
          alert('Error');    
        }
      }, (message) => {
        this.isLoading = false;
        this.notification.error('Error', 'Unmatch token and mail!');
        //window.location.href = '';
        this.isValid=false;
        this.reset;
      });

    
  }

  get f() {
    return this.form.controls;
  }

  change() {
    this.isPassForm = !this.isPassForm;
    this.reset();
    // console.log(this.token);
    // console.log(this.email);
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

  passChange(pass: string){
    this.isLoading = true;
    var user = {
      email: this.email,
      password:pass,
      token: this.token
    }
    this.authService.passChange(user).subscribe(result => {
      if (result == 'SUCCESS') {
        // const returnUrl: string = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        // this.router.navigate([returnUrl]);
        // window.location.href = returnUrl;
        this.change();
      } else if (result == 'ERROR_NAME_OR_PASS') {
        alert('Error');
      }
    }, (message) => {
      this.isLoading = false;
      this.notification.error('Error', 'Change password uncomplete!');
    });
  }

  login() {
    window.location.href = '';
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
