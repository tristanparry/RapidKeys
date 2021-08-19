import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { Subscription } from 'rxjs';
const txtgen = require('txtgen'); // npm library used for random paragraph generation

@Component({
  selector: 'app-typing-phrase',
  templateUrl: './typing-phrase.component.html',
  styleUrls: ['./typing-phrase.component.css']
})

export class TypingPhraseComponent implements OnInit {
  // Prop declarations
  characterElements: Array<string> = [];
  resetEventSubscription: Subscription;

  constructor(private sharedService: SharedService) {
    this.resetEventSubscription = this.sharedService.getResetEvent().subscribe(() => this.setPhrase());
  }

  // Generates a new phrase when the component loads
  ngOnInit(): void {
    this.setPhrase();
  }

  setPhrase(): void { // Generates random paragraph on page load
    this.characterElements.length = 0; // Clears current character array
    let text: string;
    while (true) {
      text = txtgen.paragraph(); // npm txtgen method
      if ((text.length >= 300) && (text.length <= 340)) {
        text.split('').forEach(character => this.characterElements.push(character)); // Push each character in the generated paragraph to the array prop
        break;
      } else {
        continue;
      }
    }
  }
}