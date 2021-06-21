import { Todo } from './../../models/todo.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UiService } from './../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  title: string;
  showAddTask: boolean;
  subscription: Subscription;
  @Output() addTodo: EventEmitter<any> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showAddTask = value));
   }

  ngOnInit(): void {
  }

  onAddTodoSubmit() {
    if (!this.title) {
      alert('Please add some text...');
      return;
    }
    
    const newTodo = {
      title: this.title,
      completed: false
    }
    
    this.addTodo.emit(newTodo);
    this.title = '';
  }

  // addTodoClicked() {
  //   if (!this.title) {
  //     alert('Please add some text...');
  //     return;
  //   }

  //   this.title = '';
  // }
}
