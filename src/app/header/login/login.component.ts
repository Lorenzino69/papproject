import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService, private http: HttpClient) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const formData = this.loginForm.value;
    this.http.post('http://locahost/connexion.php', formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          localStorage.setItem('authToken', 'token de connexion factice'); // TODO: remplacer par un token réel du backend
          this.router.navigate(['/dashboard']);
        } else {
          console.error(response.message);
        }
      },
      error => {
        console.error('Erreur lors de la requête HTTP:', error);
      }
    );
  }

  navigateToSignUp(): void {
    // Ajoutez votre logique de navigation vers la création de compte ici
    this.router.navigate(['/signup']);
  }

  navigateToForgotPassword(): void {
    // Ajoutez votre logique de navigation vers la page de mot de passe oublié ici
    this.router.navigate(['/forgot-password']);
  }

}
