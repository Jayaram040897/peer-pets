import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signUpform = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });
  submitAttempt: boolean = false;
  userExists: boolean = false;
  usernotExists: boolean  = false;
  constructor(private fb: FormBuilder , private authService: AuthService,public router: Router) { }

  ngOnInit(): void {

  }

  passCheck() {
      this.signUpform.get('confirmPassword')?.valueChanges.subscribe((data: any) => {
        if (this.signUpform.get('password')?.value !== data && this.signUpform.get('password')?.value !== '') {
          this.signUpform.controls.confirmPassword.setErrors({ 'passwordMatch': true });
        } else if (this.signUpform.get('password')?.value === '') {
          this.signUpform.controls.confirmPassword.setErrors({ 'passwordNotMatch': true });
        }
      })
    }

    onSubmit(){
      this.submitAttempt = true;
      if(this.signUpform.invalid){
        return;
      }else{
        let data = this.signUpform.value;
        let payload = {
          'username': this.signUpform.value.username,
          'password': this.signUpform.value.password
        }
        this.authService.register(payload).subscribe((res:any) => {
          if(res.success){
            this.router.navigate(['login']);
            alert('Registration Success!!')
          }else{
            alert('Sorry, Some eror occurred!!')
          }
        })
      }
    }

    omit_special_char(event:any) {
      let k;
      k = event.charCode;  //         k = event.keyCode;  (Both can be used)
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57));
    }

    userIdCheck() {
      if(this.signUpform.controls['username'].valid){
        this.userExists = false;
        let data = {
          userId: this.signUpform.value.username
        };
        this.authService.userIdExist(data).subscribe(user => {
          if (user.userExist) {
            this.userExists = true;
          } else {
            this.usernotExists = true;
          }
        });
      }else{
        return;
      }

    }

}
