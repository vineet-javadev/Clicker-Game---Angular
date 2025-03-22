import { Component, effect, HostListener, signal } from '@angular/core';
import { user } from '../../../global';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})



export class MainComponent {

  counter = signal(0);
  level = 'easy';
  cellibrationSignal = true;

  constructor() {
    effect(() => {
      if (this.cellibrationSignal && ((this.level === 'easy' && user().easyscore+1 === this.counter()) || (this.level === 'medium' && user().mediumscore +1=== this.counter()) || (this.level === 'hard' && user().hardscore+1 === this.counter()))) {
        alert("Congratulations! You break your own Record. { Keep it up }");
        this.cellibrationSignal = false;
      }
      console.log("effect called" + this.cellibrationSignal);
    });
  }

  changeLevel(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    if (this.level !== value) {
      this.level = value;
      this.counter.set(0);
      this.cellibrationSignal = true;
    }

  }

  onSubmit() {
    let temp = user();
    if (this.level === 'easy' && user().easyscore < this.counter()) {
      alert('Congratulations! You have scored ' + this.counter() + ' points');
      temp = { name: user().name, easyscore: this.counter(), mediumscore: user().mediumscore, hardscore: user().hardscore };
      
      localStorage.setItem('clickerdb', JSON.stringify(temp));
    } else if (this.level === 'medium' && user().mediumscore < this.counter()) {
      alert('Congratulations! You have scored ' + this.counter() + ' points');
      temp = { name: user().name, easyscore: user().easyscore, mediumscore: this.counter(), hardscore: user().hardscore };
      
      localStorage.setItem('clickerdb', JSON.stringify(temp));
    } else if (this.level === 'hard' && user().hardscore < this.counter()) {
      alert('Congratulations! You have scored ' + this.counter() + ' points');
      temp = { name: user().name, easyscore: user().easyscore, mediumscore: user().mediumscore, hardscore: this.counter() };
      // localStorage.setItem('clickerdb', JSON.stringify(temp));
    } else {
      alert('Better Luck for next Time! Your score is ' + this.counter());
    }
    user.set(temp);
    this.counter.set(0);
    this.cellibrationSignal = true;
  }


  // Listen for key presses
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.level === 'easy' && (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown')) {
      this.counter.set(this.counter() - 1);
    }
    if (this.level === 'easy' && (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp')) {
      this.counter.set(this.counter() + 1);
    }
  }

}

