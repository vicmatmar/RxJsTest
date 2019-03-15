import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { mergeMap, tap, map, first, take, takeUntil, filter } from 'rxjs/operators'
import { ITodoItem } from './todoItem';
import { MonoTypeOperatorFunction, Observable, Subscriber } from 'rxjs';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  filterTxt: string = '';
  cachedTodos: ITodoItem[] = [];
  displayTodos: ITodoItem[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {


    let url: string = 'https://jsonplaceholder.typicode.com/todos';

    let headers = new HttpHeaders().append('Content-type', 'application/json');
    let todosSub = this.http.get<any>(url, { headers: headers })
      .pipe(
        mergeMap<any, ITodoItem>(a => a),
        this.filterByUserIdAndTakeLimit(6, 5),
        //filter(i => i.userId == 6),
        //tap(i => { console.debug(i.title);   }),
        //take(5)
        //map(a => a.filter(i => i.id > 100))  // just get last 100
      )
      .subscribe(
        res => this.setTodos(res),
        error => console.error(error),
        () => console.debug("Done")
      )
  }


  filterByUserIdAndTakeLimit(userId: number, takeLimit: number): MonoTypeOperatorFunction<ITodoItem> {
    return source$ => {

      return new Observable<ITodoItem>(subscriber => {

        return source$
        .pipe(
          filter<ITodoItem>(todo => todo.userId == userId),
          take(takeLimit)
        )
        .subscribe(
          todo => {
              //console.log(`${todo.title}`);
              subscriber.next(todo);
          },
          err => subscriber.error(err),
          () => subscriber.complete()
        );

      });
    }
  }

  filterData() {
    let idFilter = +this.filterTxt;
    this.displayTodos = this.cachedTodos.filter(v => v.id == idFilter);
  }


  setTodos(value: ITodoItem) {

    this.cachedTodos.push(value);
    this.displayTodos.push(value);
    //let t = 
  }

}
