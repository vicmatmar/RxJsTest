import { observable, of, from, fromEvent, interval, Observable, Subscription } from 'rxjs'
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
/**
 * 2 Observables subscribers are added and then one unsubcribe ends boths
 * first displays time in page
 * 2nd in console
 */
export class TimerComponent implements OnInit, OnDestroy {

  timerSubs: Subscription;

  ngOnDestroy(): void {
    // if you don't do this you will have a bunch of timers running while testing around
    if (this.timerSubs)
      this.timerSubs.unsubscribe();
  }

  constructor() { }

  ngOnInit() {

    let btn = document.getElementById('stopTimer');
    let readers = document.getElementById('readers');

    //* Differen ways to do a timer
    //let timer$ = interval(1000);

    let timer$ = new Observable(s => {
      let i = 0;
      let intId = setInterval(() => {
        s.next(i++);
      }, 1000);

      return () => {
        console.debug("Teardown");
        clearInterval(intId);
      }
    });


    this.timerSubs = timer$.subscribe(
      value => {
        readers.innerHTML += `${new Date().toLocaleTimeString()} ${value}<br>`;
      }
    );

    let timerConsoleSubs = timer$.subscribe(
      value => {
        console.log(`${new Date().toLocaleTimeString()} ${value}`);
      }
    );

    this.timerSubs.add(timerConsoleSubs);

    /**
     * Subscribe to the click event of the buttton
     * Unsbscribe to the first subscription when the event is triggered
     */
    fromEvent(btn, "click").subscribe(
      value => {
        console.debug('Button click event:', value);
        this.timerSubs.unsubscribe();
      }
    )

  }

}
