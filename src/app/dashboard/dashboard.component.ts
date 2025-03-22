import { Component, computed } from '@angular/core';
import { defaultUser, user } from '../../../global';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  localUser = computed(() => user());

  resetHandle() {
    let temp = { name: user().name, easyscore: 0, mediumscore: 0, highscore: 0 };
    user.set(temp);
    localStorage.setItem('clickerdb', JSON.stringify(temp));
  }

  changeUser(){
    try {
      user.set(defaultUser);
      localStorage.removeItem('clickerdb');
    } catch (error) {
      console.log("Error in file : dashboard.component -- " + error);
    }
  }
}

