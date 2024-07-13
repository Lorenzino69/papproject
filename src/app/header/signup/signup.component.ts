import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ MatCardModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
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

  constructor(private fb: FormBuilder, private router: Router,private http: HttpClient) {}

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
      const formData = this.signupForm.value;

      this.http.post('http://locahost/signup.php', formData).subscribe(
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
  }

  navigateToLogin(): void {
    // Ajoutez votre logique de navigation vers la page de connexion ici
    this.router.navigate(['/login']);
  }
}
