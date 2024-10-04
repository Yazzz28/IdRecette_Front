import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import consolidé pour ReactiveForms
import { RouterLink } from '@angular/router';
import { TITLE } from '../../../../utils/general';
import { RegexService } from '../../../../service/regex.service';

@Component({
  selector: 'app-login',
  standalone: true,
  // On regroupe les imports nécessaires dans la propriété `imports`
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Correctement pluralisé
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
