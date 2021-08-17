import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitAttempt: boolean = false;
  loginform = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],

  });
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitAttempt = true;
    if(this.loginform.invalid){
      return;
    }else{
      let data = this.loginform.value;
      this.authService.login(data).subscribe((res:any) => {
        console.log(res,'res');
        if(res.success){
          alert("Loggedin Successfully!!");
          this.router.navigate(['pets-list'])
          localStorage.setItem('token',res.token);
          localStorage.setItem('refreshToken',res.refreshToken);
          localStorage.setItem('userDetails',JSON.stringify(res.user));
        }else{
          alert("Username / Password is incorrect!!")
        }
      })
    }
  }
  omit_special_char(event:any) {
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57));
  }

}
