import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';

  constructor(private http:HttpClient) { }

  getTodos():Observable<Todo[]> {
    const getUrl = `${this.todosUrl}${this.todosLimit}`;
    return this.http.get<Todo[]>(getUrl);
  }

  toggleCompletedTodo(todoSingle: Todo):Observable<any> {
    const putUrl = `${this.todosUrl}/${todoSingle.id}`;
    return this.http.put(putUrl, todoSingle, httpOptions);
  }

  deleteTodo(todoSingle: Todo):Observable<Todo> {
    const deleteUrl = `${this.todosUrl}/${todoSingle.id}`;
    return this.http.delete<Todo>(deleteUrl, httpOptions);
  }

  addTodo(todoSingle: Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todoSingle, httpOptions);
  }

  // Get Todos hardcoded values, no server
  // getTodos() {
  //   return [
  //     {
  //       id: 1,
  //       title: 'Do that first',
  //       completed: false
  //     },
  //     {
  //       id: 2,
  //       title: 'Second todo',
  //       completed: true
  //     },
  //     {
  //       id: 3,
  //       title: '3. todo',
  //       completed: false
  //     },
  //   ]
  // }
}
