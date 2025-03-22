import { Component, computed, signal} from '@angular/core';
import { TopSectionComponent } from "./top-section/top-section.component";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CommonModule } from '@angular/common';
import { SignupComponent } from "./signup/signup.component";
import { defaultUser, user } from '../../global';

@Component({
  selector: 'app-root',
  imports: [TopSectionComponent, DashboardComponent, CommonModule, SignupComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isLoggedIn = computed(() => user() !== defaultUser);
  
}



// counter: number = 0;

// activeButtons: { [key: string]: boolean } = {
//   btn1: true,
//   btn2: true,
//   btn3: true
// };

// // Toggle button activation
// toggleButton(button: string) {
//   this.activeButtons[button] = !this.activeButtons[button];
// }

// // Listen for key presses
// @HostListener('window:keydown', ['$event'])
// handleKeyDown(event: KeyboardEvent) {
//   if (event.key === 'a' && this.activeButtons['btn1']) {
//     this.counter--;
//   }
//   if (event.key === 's' && this.activeButtons['btn2']) {
//     this.counter = 0;
//   }
//   if (event.key === 'd' && this.activeButtons['btn3']) {
//     this.counter++;
//   }
// }
