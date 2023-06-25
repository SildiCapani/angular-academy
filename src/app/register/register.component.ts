import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserLogin, IUserRegister } from '../shared/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  
  registerForm!: FormGroup;
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  
  returnUrl: string = '';

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submit():void {
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const user: IUserRegister = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      confirmPassword: this.registerForm.get('confirmPassword')?.value
    }

    this.userService.register(user).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }
  
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, {
      validators: this.PasswordsMatchValidator('password', 'confirmPassword')
    });
    this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  PasswordsMatchValidator(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {

    return (form: AbstractControl): ValidationErrors | null => {
      const passwordControl = form.get(passwordControlName);
      const confirmPasswordControl = form.get(confirmPasswordControlName);
  
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
  
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ notMatch: true });
      } else {
        const errors = confirmPasswordControl.errors;
        if (!errors) {
          return null;
        }
  
        delete errors['notMatch'];
        confirmPasswordControl.setErrors(errors);
      }
  
      return null;
    };
  }


}
