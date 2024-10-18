import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'; 
import { RouterLink, Router } from '@angular/router'; 
import { TITLE } from '../../../../utils/general';
import { RegexService } from '../../../../service/regex.service';
import { AuthService } from '../../../../service/auth-service.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  title: string = TITLE;
  placeholderMail: string = 'Email';
  placeholderPassword: string = 'Mot de passe';
  button: string = 'Je me connecte';
  signUp: string = 'Inscrivez-vous';

  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder, 
    private readonly regexService: RegexService, 
    private readonly authService: AuthService, 
    private readonly router: Router 
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.emailRegex)
        ]
      ],
      password: ['', Validators.required],
    });
  }
  
  securePasswordValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValid =
        value.length >= 8 &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar;

       return isValid ? null : { securePassword: true };
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulaire valide, connexion en cours...');
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          console.log('Connexion réussie!', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur de connexion', error);
          alert('Erreur de connexion : ' + error.message); // Affichez un message d'erreur
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
