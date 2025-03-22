import { Component } from '@angular/core';
import { user , User } from '../../../global';
@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUpProcess() {
    let username : string | undefined = document.querySelector('input')?.value;
    if(username && username.length > 0) {
      username = username.charAt(0).toUpperCase() + username.slice(1).trim();
      const newUser: User = {
        name: username as string,
        easyscore: 0,
        mediumscore: 0,
        hardscore: 0
      }

      localStorage.setItem('clickerdb', JSON.stringify(newUser));
      user.set(newUser);
      alert('User created successfully');
    }
  }

  enterEvent(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.signUpProcess();
    }
  }

}

