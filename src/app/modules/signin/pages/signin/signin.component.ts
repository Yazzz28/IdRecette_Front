import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms'; 
import { RouterLink } from '@angular/router';
import { User } from '../../../../utils/user';
import { SigninService } from '../../../../service/signin.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  imports: [RouterLink, ReactiveFormsModule],
})
export class SigninComponent {
  signinForm: FormGroup;
  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private readonly fb: FormBuilder, private readonly signinService: SigninService) {
    this.signinForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group(
        {
          password: ['', [Validators.required, this.securePasswordValidator(), Validators.minLength(8)]],
          confirmPassword: ['', [Validators.required]]
        },
        { validators: this.passwordMatchValidator() }
      )
    });
  }

  get passwordsGroup() {
    return this.signinForm.get('passwords') as FormGroup;
  }

  onSubmit() {
    if (this.signinForm.valid) {
      console.log('Formulaire valide, inscription en cours...');
      const formValue = {
        ...this.signinForm.value,
        password: this.signinForm.get('passwords.password')?.value,
        confirmPassword: this.signinForm.get('passwords.confirmPassword')?.value
      };
      this.user = formValue;

      // Store user information in the service
      this.signinService.setUser(this.user);
      
      // You can now navigate to the next step or process the data further
    } else {
      console.log('Formulaire invalide', this.signinForm.errors);
      this.signinForm.markAllAsTouched();
    }
  }
  
  securePasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      
      const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      return isValid ? null : { securePassword: true };
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }
}
