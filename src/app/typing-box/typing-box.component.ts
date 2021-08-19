import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SharedService } from './../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-typing-box',
  templateUrl: './typing-box.component.html',
  styleUrls: ['./typing-box.component.css']
})
export class TypingBoxComponent {
  resetEventSubscription: Subscription;
  inputTries: number = 0;
  typedText: string = "";
  phraseTextArray: Array<HTMLSpanElement> = [];
  charactersTyped: number = 0;

  constructor(private sharedService: SharedService, @Inject(DOCUMENT) private _document: any) {
    this.resetEventSubscription = this.sharedService.getResetEvent().subscribe(() => { // Defines the activity for this component when the reset function is called
      const textBox = this._document.querySelector('textarea');
      if (textBox !== null) textBox.value = "";
      this.phraseTextArray.forEach((currentCharacter: HTMLSpanElement, currentIndex: number) => currentCharacter.style.background = "transparent");
      textBox.disabled = false;
      this.inputTries = 0;
      this.charactersTyped = 0;
    });
  }

  /* If this is the first time typing, start the timer
     If not, do not execute this function again */
  startTimer() {
    this.inputTries++;
    if (this.inputTries <= 1) {
      this.sharedService.startEvent();
    }
  }

  trackTyping() {
    // Variable initializations
    let errorsMade: number = 0;
    const typedTextArray = this.typedText.split('');
    this.phraseTextArray = this._document.getElementById('phraseContainer').querySelectorAll('span'); // Returns NodeList of found HTMLSpanElements in #phraseContainer
    this.charactersTyped = this._document.querySelector('textarea').value.length;

    /* Check validity of currently typed character by iterating over each element
    in the phraseTextArray NodeList, each currentCharacter is an HTMLSpanElement */
    this.phraseTextArray.forEach((currentCharacter: HTMLSpanElement, currentIndex: number) => {
      if (typedTextArray[currentIndex] == null) {
        currentCharacter.style.background = "transparent";
      } else if (currentCharacter.innerText === typedTextArray[currentIndex]) {
        currentCharacter.style.background = "#2e962e7c"; // Translucent green background
      } else {
        currentCharacter.style.background = "#a321217c"; // Translucent red background
        errorsMade++;
      }
    });

    // Run methods from the stats panel (WPM, Errors, Accuracy)
    this.sharedService.wpmEvent(this.charactersTyped);
    this.sharedService.errorsEvent(errorsMade);
    this.sharedService.accuracyEvent(this.charactersTyped);

    // Check if text is fully typed
    if (typedTextArray.length >= this.phraseTextArray.length) {
      this._document.querySelector('textarea').disabled = true; // Disable the textarea
      this.sharedService.stopEvent(); // Stop the timer
    }
  }
}
