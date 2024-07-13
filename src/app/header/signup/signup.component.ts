import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ MatCardModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const firstName = this.signupForm.get('firstName')?.value;
      const lastName = this.signupForm.get('lastName')?.value;
      const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;
      // Ajoutez votre logique de création de compte ici
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
      console.log('Password:', password);
      localStorage.setItem('authToken', 'token de connexion factice'); //TODO a générer par le backend
      // Rediriger vers le tableau de bord après la création de compte
      this.router.navigate(['/dashboard']);
    }
  }

  navigateToLogin(): void {
    // Ajoutez votre logique de navigation vers la page de connexion ici
    this.router.navigate(['/login']);
  }
}
