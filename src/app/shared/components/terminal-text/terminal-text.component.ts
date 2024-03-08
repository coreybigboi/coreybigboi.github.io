import { Component, Input } from '@angular/core';
import { Colours } from '../../enums/colours';

interface IntervalObserver {
  hasFinished: boolean;
}

@Component({
  selector: 'app-terminal-text',
  standalone: true,
  imports: [],
  templateUrl: './terminal-text.component.html',
  styleUrl: './terminal-text.component.css'
})
export class TerminalTextComponent {
  readonly colours: string[];
  readonly intervalMilliseconds: number;
  readonly waitTime: number;
  readonly cursorInterval: number;
  
  cursor: HTMLElement | null = null;
  displayText: string;
  currentColour: string;

  @Input()
  textList!: string[]

  constructor() {
    this.colours = [Colours.DarkBlue, Colours.DarkGreen, Colours.DarkGrey];
    this.displayText = "";
    this.currentColour = this.colours[0];
    this.intervalMilliseconds = 100;
    this.waitTime = 1200;
    this.cursorInterval = 500;
  }
  
  ngOnInit() {
    this.cursor = document.getElementById("cursor");
    this.animateConsoleText();
    this.animateCursor();
  }

  // periodically prints a word one character at a time
  printWord(word: string, observer: IntervalObserver): any {
    let index = 0;

    const interval = setInterval(() => {
      if (index === word.length - 1) {
        clearInterval(interval);
        setTimeout(this.deleteWord.bind(this, observer), this.waitTime);
      }
      this.displayText += word[index];
      index++;
    }, this.intervalMilliseconds);
  }

  // periodically deletes a word one character at a time
  deleteWord(observer: IntervalObserver) {
    
    const interval = setInterval(() => {
      if (this.displayText === "") {
        observer.hasFinished = true;
        clearInterval(interval);
        return;
      }
      
      this.displayText = this.displayText.slice(0, -1)
    }, this.intervalMilliseconds);
  }

  animateConsoleText() {
    let textListIndex = 0;
    let coloursIndex = 0;

    // shared memory to check when the process of printing a word has finished
    const observer: IntervalObserver = {
      hasFinished: false
    }

    this.printWord(this.textList[textListIndex], observer);

    const interval = setInterval(() => {
      if (!observer.hasFinished) return;

      observer.hasFinished = false;

      // wrap around if reached end of array
      textListIndex = textListIndex >= (this.textList.length - 1) ? 0 : textListIndex + 1;
      coloursIndex = coloursIndex >= (this.colours.length - 1) ? 0 : coloursIndex + 1;

      this.currentColour = this.colours[coloursIndex]
      this.printWord(this.textList[textListIndex], observer);
    }, this.waitTime)
  }

  animateCursor() {
    setInterval(() => {
      if (this.cursor === null) return;
      this.cursor.classList.toggle("hidden");
    }, this.cursorInterval);
  }
}