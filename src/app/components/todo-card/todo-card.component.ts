import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoKeyLocalStorage } from 'src/app/models/enum/todoKeyLocalStorage';
import { Todo } from 'src/app/models/model/todo.model';
import { TodoSignalService } from 'src/app/services/todo-signal.service';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './todo-card.component.html',

})
export class TodoCardComponent implements OnInit {
  private todosSignalsService = inject(TodoSignalService);
  private todosSignal = this.todosSignalsService.todosState;
  public todosList = computed(() => this.todosSignal);
  public todosArray = this.todosSignalsService.todosState();

  constructor() {
    effect(() => {
      console.log('SIGNAL FOI ATUALIZADO', this.todosSignalsService.todosState());
    })
  }

  public ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  getTodosInLocalStorage() {
    const todosDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string;
    todosDatas && (this.todosSignal.set(JSON.parse(todosDatas)))
  }

  private saveTodosInLocalStorage(): void {
    this.todosSignalsService.saveTodosInLocalStorage();
  }

  public handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.update((todos) => {
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo
        todoSelected && (todoSelected.done = true)
        return todos
      })
      this.saveTodosInLocalStorage();
    }
  }

  public handleDeleteTodo(todo: Todo): void {
    if (todo) {
      const todosArray = this.todosSignalsService.todosState();
      // const index = todosArray.indexOf(todo);
      const updateTodosArray = todosArray.filter((t) => t.id !== todo.id);
      this.todosSignalsService.todosState.set(updateTodosArray);
      this.saveTodosInLocalStorage();
      // if (index !== -1) {
      //   this.todosSignal.update((todos) => {
      //     todos.splice(index, 1);
      //     this.todosSignalsService.todosState.set([...todosArray]);
      //     this.saveTodosInLocalStorage();
      //   });
      // }
    }
  }
}
