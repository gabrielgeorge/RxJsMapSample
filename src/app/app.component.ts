import { Component } from '@angular/core';
import { Observable, interval, Subject, Subscription } from 'rxjs';

import { switchMap, exhaustMap, mergeMap, take, concatMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  obs = new Subject();
  values = [];
  mapType: 'mergeMap' | 'concatMap' | 'exhaustMap' | 'switchMap' = 'mergeMap';

  mapTitle = 'Merge Map';
  observable$: Subscription;
  interval$ = interval(1000);

  constructor() {
    this.observable$ = this.obs
      .pipe(
        mergeMap(event => {
          return this.interval$.pipe(take(5));
        })
      )
      .subscribe(num => {
        console.log(num);
        this.values.push(num);
      });
  }

  changeMap() {
    if (this.mapType === 'mergeMap') {
      this.mapTitle = 'Merge Map';
      this.observable$.unsubscribe();
      this.values = [];
      this.observable$ = this.obs
        .pipe(
          mergeMap(event => {
            return this.interval$.pipe(take(5));
          })
        )
        .subscribe(num => {
          console.log(num);
          this.values.push(num);
        });
    } else if (this.mapType === 'exhaustMap') {
      this.mapTitle = 'Exhaust Map';
      this.observable$.unsubscribe();
      this.values = [];

      this.observable$ = this.obs
        .pipe(
          exhaustMap(event => {
            return this.interval$.pipe(take(5));
          })
        )
        .subscribe(num => {
          console.log(num);
          this.values.push(num);
        });
    } else if (this.mapType === 'switchMap') {
      this.mapTitle = 'Switch Map';
      this.observable$.unsubscribe();
      this.values = [];

      this.observable$ = this.obs
        .pipe(
          switchMap(event => {
            return this.interval$.pipe(take(5));
          })
        )
        .subscribe(num => {
          console.log(num);
          this.values.push(num);
        });
    } else {
      this.mapTitle = 'Concat Map';
      this.observable$.unsubscribe();
      this.values = [];

      this.observable$ = this.obs
        .pipe(
          concatMap(event => {
            return this.interval$.pipe(take(5));
          })
        )
        .subscribe(num => {
          console.log(num);
          this.values.push(num);
        });
    }
  }

  log(event) {
    console.log(event);
    console.log(this.mapType);
  }

  trigger() {
    this.values.push('Trigger button clicked!');
    console.log('Trigger button clicked!');
    this.obs.next();
  }
}
