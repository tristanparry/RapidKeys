import { Component } from '@angular/core';
import { SharedService } from './../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  // Subscriptions to SharedService functions
  startEventSubscription: Subscription;
  stopEventSubscription: Subscription;
  wpmEventSubscription: Subscription;
  errorsEventSubscription: Subscription;
  accuracyEventSubscription: Subscription;

  // Stats dashboard variables (displayed in HTML template)
  currentWPM: number = 0;
  currentErrorCount: number = 0;
  currentAccuracy: number = 0;

  // Timer (stopwatch) props
  interval: any;
  running: boolean = false;
  deciseconds: number = 0;
  displayDeciseconds: string = "00";
  seconds: number = 0;
  displaySeconds: string = "00";
  minutes: number = 0;
  displayMinutes: string = "00";
  totalTime: number = 0;

  constructor(private sharedService: SharedService) {
    this.startEventSubscription = this.sharedService.getStartEvent().subscribe(() => this.startGame());
    this.stopEventSubscription = this.sharedService.getStopEvent().subscribe(() => this.running = false);
    this.wpmEventSubscription = this.sharedService.getWpmEvent().subscribe(charsArg => this.calculateWPM(charsArg));
    this.errorsEventSubscription = this.sharedService.getErrorsEvent().subscribe(errorsArg => this.currentErrorCount = errorsArg);
    this.accuracyEventSubscription = this.sharedService.getAccuracyEvent().subscribe(charsArg => this.calculateAccuracy(charsArg));
  }

  // Handles the stopwatch changes
  stopwatch() {
    if (this.running) {
      this.deciseconds++; // Increment deciseconds every time the stopwatch function is called

      if (this.deciseconds / 100 === 1) {
        this.deciseconds = 0;
        this.seconds++;

        if (this.seconds / 60 === 1) {
          this.seconds = 0;
          this.minutes++;
        }
      }

      // Set the variables for state management/display (using ternary operators as error detection)
      this.displayDeciseconds = (this.deciseconds < 10) ? ("0" + this.deciseconds.toString()) : (this.deciseconds.toString());
      this.displaySeconds = (this.seconds < 10) ? ("0" + this.seconds.toString()) : (this.seconds.toString());
      this.displayMinutes = (this.minutes < 10) ? ("0" + this.minutes.toString()) : (this.minutes.toString());
      this.totalTime = this.seconds + (this.minutes * 60); // Dynamically calculates the total elapsed time, to be used in the WPM calculation
    }
  }

  // Executes the stopwatch incrementation at a set interval in the window
  startGame() {
    this.running = true;
    this.interval = setInterval(() => this.stopwatch(), 10); // Update every decisecond
  }

  // Resets all props/intervals to default so that another round can be played
  resetGame() {
    this.running = false;
    clearInterval(this.interval); // Prevents the timer from speeding up each round, by clearing/resetting the original interval
    this.sharedService.resetEvent(); // Clear textarea + Generate new paragraph
    // Set all other class fields to 0 (reset fields)
    this.currentWPM = 0;
    this.currentErrorCount = 0;
    this.currentAccuracy = 0;
    this.deciseconds = 0;
    this.displayDeciseconds = "00";
    this.seconds = 0;
    this.displaySeconds = "00";
    this.minutes = 0;
    this.displayMinutes = "00";
    this.totalTime = 0;
  }

  calculateWPM(charsArg: number) {
    this.currentWPM = parseFloat((((charsArg / this.totalTime) / 4.7) * 60).toFixed(1)) // 4.7 is the average number of characters in an English word
  }

  calculateAccuracy(charsArg: number) {
    this.currentAccuracy = parseFloat((100 - ((this.currentErrorCount / charsArg) * 100)).toFixed(1));
  }
}
