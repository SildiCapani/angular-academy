import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})


export class LoginPageComponent implements OnInit {
  
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl = '';
  showPassword: boolean = false;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]) 
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl']
  }

  submit(): void {
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userService.login({
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
      })
  }

}
