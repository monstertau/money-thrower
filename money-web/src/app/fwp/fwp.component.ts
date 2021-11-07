import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-fwp',
  templateUrl: './fwp.component.html',
  styleUrls: ['./fwp.component.css']
})
export class FwpComponent implements OnInit{
 form!: FormGroup;
  passwordVisible = false;
  passwordConfirmVisible = false;
  isMailForm = true;
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
    this.isMailForm = !this.isMailForm;
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

  mailConfirm(email: string){
    // this.isLoading = true;
    // console.log(email);
    // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if(email==null){
    //   this.isLoading = false;
    //   this.notification.error('Error', 'Invalid email/password combination. Please try again.');
    // }
    // else if(email.match(mailformat)){
    //   this.change();
    //   console.log(this.isMailForm);
    // }
    // else{
    //   this.isLoading = false;
    //   this.notification.error('Error', 'Invalid email. Please try again.');
    // }
    
    this.isLoading = true;
    var user = {
      email: email
    }
    this.authService.mailConfirm(user).subscribe(result => {
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
      this.notification.error('Error', 'Invalid email. Please try again.');
    });
  }
  register() {
    window.location.href = '';
  }

  login() {
    window.location.href = '';
  }
  fwp(){
    window.location.href = 'fwp';
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
