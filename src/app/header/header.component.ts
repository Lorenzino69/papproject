import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAnchor, MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatFormFieldModule,
    FormsModule,
    MatAnchor,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, CurrencyPipe, RouterLink, AsyncPipe, NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isLoggedIn();
  }
  value = '';
  cartPrice = 0;
  isAuthenticated$: Observable<boolean>;
  login() {
    // Ajoutez votre logique de connexion ici
    console.log('Login button clicked');
    this.router.navigate(['/login']);
  }

  createAccount() {
    // Ajoutez votre logique de création de compte ici
    this.router.navigate(['/signup']);
  }

  goToCart() {
    // Ajoutez votre logique pour aller au panier ici
    console.log('Go to cart button clicked');
  }

  logout(): void {
    // Ajoutez votre logique de déconnexion ici
    this.authService.logout();
  }
}
