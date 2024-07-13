import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

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
  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      // Ajoutez votre logique de connexion ici
      console.log('Email:', email);
      console.log('Password:', password);
      this.authService.login('token de connexion factice'); //TODO a génrer par le backend
      //recharger page
      // Rediriger vers le tableau de bord après la connexion
      this.router.navigate(['/dashboard']);
    }
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
