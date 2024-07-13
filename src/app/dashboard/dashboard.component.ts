import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
