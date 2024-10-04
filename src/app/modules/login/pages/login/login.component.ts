import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TITLE } from '../../../../utils/general';
import { RegexService } from '../../../../service/regex.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule], // On importe le ReactiveFormsModule ici
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  title: string = TITLE;
  placeholderMail: string = 'Email';
  placeholderPassword: string = 'Mot de passe';
  button: string = 'Je me connecte';
  signUp: string = 'Inscrivez-vous';

  loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly regexService: RegexService) {
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

  // Fonction pour soumettre le formulaire
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulaire valide, connexion en cours...');
      // Logic de connexion ici
    } else {
      console.log('Formulaire invalide');
    }
  }
}
