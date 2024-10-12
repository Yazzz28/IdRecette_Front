import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { RouterLink, Router } from '@angular/router'; 
import { AuthService } from '../../../../service/auth-service.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // Importer ReactiveFormsModule ici
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'] // Correction du styleUrls
})
export class SigninComponent {
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder, 
    private readonly authService: AuthService, 
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email // Validation pour l'email
        ]
      ],
      password: ['', Validators.required],
    });
  }

  // Fonction pour soumettre le formulaire
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value; // Obtenir les valeurs du formulaire

      this.authService.login(email, password).subscribe({
        next: (response: { token: string; }) => {
          // Stocker le token JWT dans le localStorage ou sessionStorage
          localStorage.setItem('token', response.token);
          console.log('Connexion réussie!', response);
          this.router.navigate(['/dashboard']); // Rediriger vers le tableau de bord
        },
        error: (error: { error: { message: string; }; }) => {
          console.error('Erreur de connexion', error);
          alert('Erreur de connexion : ' + error.error.message); // Afficher un message d'erreur
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
