import { Component, effect, HostListener, signal } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { user } from '../../../global';

@Component({
  selector: 'app-main',
  imports: [FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})



export class MainComponent {

  counter = signal(0);
  level = 'easy';
  cellibrationSignal = true;

  constructor() {
    effect(() => {
      if (this.cellibrationSignal && ((this.level === 'easy' && user().easyscore + 1 === this.counter()) || (this.level === 'medium' && user().mediumscore + 1 === this.counter()) || (this.level === 'hard' && user().hardscore + 1 === this.counter()))) {
        alert("Congratulations! You break your own Record. { Keep it up }");
        this.cellibrationSignal = false;
      }
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
      localStorage.setItem('clickerdb', JSON.stringify(temp));
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

  // for the typing game
  randomChar: string = this.generateRandomChar();
  userInput: string = '';
  isGameOver: boolean = true;

  // Generate a random lowercase character
  generateRandomChar(): string {
    const randomCharCode = Math.floor(Math.random() * 26) + 97; // a-z
    return String.fromCharCode(randomCharCode);
  }

  onChangeInputField(): void {
    if (this.userInput.length === 1) {
      this.submitAnswer();  // Check the answer when the user types a character
    } else {
    }
  }

  submitAnswer(): void {
    if (this.userInput === this.randomChar) {
      this.counter.set(this.counter() + 1)  // Increment the score
      this.randomChar = this.generateRandomChar();  // Generate new random character
    } else if (this.userInput === '0') {
      this.isGameOver = true;
      this.onSubmit();
      this.level = 'easy';  // End the game
    } else {
      alert("Incorrect! Try again.");
      this.counter.set(this.counter() - 1);  // Decrement the score 
    }
    (document.getElementById("hardInputField") as HTMLInputElement).value = '';  // Clear the input field
  }

  // Reset the game
  resetGame(): void {
    this.counter.set(0);
    this.randomChar = this.generateRandomChar();
    this.userInput = '';
  }

}

