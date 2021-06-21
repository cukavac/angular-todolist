import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todoSingle: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  faTimes = faTimes;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todoSingle.completed
    }

    return classes;
  }

  onTodoToggle(todoSingle:any) {
    // Toggle in UI
    todoSingle.completed = !todoSingle.completed;
    // Toggle on server
    this.todoService.toggleCompletedTodo(todoSingle).subscribe(todoSingle => console.log("toggle completed", todoSingle));
  } 
  onTodoDelete(todoSingle:any) {
    this.deleteTodo.emit(todoSingle);
    // console.log("delete", todoSingle);
  } 
}
