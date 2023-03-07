import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    //Creazione di un Observable semi-custom
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    //Creazione di un Observable completamente custom
    const customIntervalObs = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    //Operators
    // customIntervalObs.pipe(map((data: number) => {
    //   return 'Round: ' + (data + 1);
    // }));

    //Abbiamo incollato l'operator prima del .subscribe nel codice sotto perché altrimenti
    //non avrebbe funzionato (sarebbe venuto l'elenco di numeri)

    this.firstObsSubscription = customIntervalObs.pipe(map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
