import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todoItems: Todo[];

  constructor(private todoService: TodoService) { }
  // constructor() {
  //   let todoService = new TodoService();
  //   this.todoItems = todoService.getTodos();
  //  }

  ngOnInit() {
    // this.todoItems = this.todoService.getTodos();
    this.todoService.getTodos().subscribe(todos => {
      this.todoItems = todos;
    });

    // this.todoItems = [
    //   {
    //     id: 1,
    //     title: 'Do that first',
    //     completed: false
    //   },
    //   {
    //     id: 2,
    //     title: 'Second todo',
    //     completed: true
    //   },
    //   {
    //     id: 3,
    //     title: '3. todo',
    //     completed: false
    //   },
    // ]
  }

  deleteTodo(todoSingle:Todo) {
    console.log("deleted", todoSingle);
    // Remove from UI
    this.todoItems = this.todoItems.filter(t => t.id !== todoSingle.id);
    // Remove from server
    this.todoService.deleteTodo(todoSingle).subscribe();
  }

  addTodo(todoSingle:Todo) {
    this.todoService.addTodo(todoSingle).subscribe(todoSingle => {
      this.todoItems.push(todoSingle);
    })
  }
}
